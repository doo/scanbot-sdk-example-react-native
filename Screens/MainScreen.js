import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { ScanbotSDK, ImageFilter, OCROutputFormat } from 'react-native-scanbot-sdk';

import { DemoScreens, DemoConstants } from '.';

export default class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      documentImageFileUri: null,
      originalImageFileUri: null,
      filteredImageFileUri: null,
      spinnerVisible: false,
      debugText: ""
    };

    this.initializeSDK();
  }

  render() {
    return (
        <ScrollView>

          <Spinner visible={this.state.spinnerVisible}
                   textContent={"Processing ..."}
                   textStyle={{color: '#FFF'}}
                   cancelable={false} />

          <Text style={styles.instructions}>
            Copyright (c) 2017 doo GmbH. All rights reserved.
          </Text>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Scanbot Camera UI"
                onPress={this.startScanbotCameraButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Scanbot Cropping UI"
                onPress={this.startScanbotCroppingButtonTapped.bind(this)} />
          </View>

          <View style={styles.container}>
            {this.renderDocumentImage()}
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <Button
                title="Rotate Image CCW️"
                onPress={this.rotateImageCCWButtonTapped.bind(this)} />
            <Button
                title="Rotate Image CW"
                onPress={this.rotateImageCWButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Apply Image Filter"
                onPress={this.applyImageFilterButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Document Detection on Gallery Image"
                onPress={this.documentDetectionButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Create PDF"
                onPress={this.createPDFButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Get OCR Configs"
                onPress={this.getOCRConfigsButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Perform OCR"
                onPress={this.performOCRButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="Is License Valid Check"
                onPress={this.isLicenseValidButtonTapped.bind(this)} />
          </View>

          <View style={styles.demoButtonPanel}>
            <Button
                title="SDK Cleanup"
                onPress={this.sdkCleanupButtonTapped.bind(this)} />
          </View>

          <Text style={styles.debugOutputHeader}>
            {'DEBUG OUTPUT:'}
          </Text>
          <Text style={styles.debugOutputContent}>
            {this.state.debugText}
          </Text>

        </ScrollView>
    );
  }

  initializeSDK() {
    let options = { licenseKey: DemoConstants.scanbotLicenseKey, loggingEnabled: true };
    ScanbotSDK.initializeSDK(options, (result) => {
      this.debugLog('initializeSDK result: ' + JSON.stringify(result));
    },
    (error) => {
      this.debugLog('initializeSDK error: ' + JSON.stringify(error));
    });
  }

  isLicenseValidButtonTapped() {
    ScanbotSDK.isLicenseValid((result) => {
      this.debugLog('isLicenseValid result: ' + JSON.stringify(result));
    },
    (error) => {
      this.debugLog('isLicenseValid error: ' + JSON.stringify(error));
    });
  }

  startScanbotCameraButtonTapped() {
    this.props.navigator.push({
      screen: DemoScreens.ScanbotCameraDemoScreen.id,
      title: DemoScreens.ScanbotCameraDemoScreen.title,
      passProps: {
        onImageCaptured: this.onImageCaptured.bind(this),
        onDocumentImageCaptured: this.onDocumentImageCaptured.bind(this),
        onChangesCanceled: this.onChangesCanceled.bind(this)
      }
    });
  }

  startScanbotCroppingButtonTapped() {
    if (!this.checkOriginalImage(true)) { return; }

    this.props.navigator.push({
      screen: DemoScreens.ScanbotCroppingDemoScreen.id,
      title: DemoScreens.ScanbotCroppingDemoScreen.title,
      passProps: {
        imageFileUri: this.state.originalImageFileUri,
        onChangesAppliedWithPolygon: this.onChangesAppliedWithPolygon.bind(this),
        onChangesCanceled: this.onChangesCanceled.bind(this)
      }
    });
  }

  applyImageFilterButtonTapped() {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();

    let options = {
      imageFileUri: this.state.documentImageFileUri,
      filterType: ImageFilter.BINARIZED,
      imageCompressionQuality: DemoConstants.JPG_QUALITY
    };
    ScanbotSDK.applyImageFilter(options, (result) => {
      this.hideSpinner();
      this.debugLog('applyImageFilter result: ' + JSON.stringify(result));
      this.setState({
        documentImageFileUri: this.state.documentImageFileUri,
        originalImageFileUri: this.state.originalImageFileUri,
        filteredImageFileUri: result.imageFileUri
      });
    },
    (error) => {
      this.hideSpinner();
      this.debugLog('applyImageFilter error: ' + JSON.stringify(error));
    });
  }

  documentDetectionButtonTapped() {
    // Open photo gallery to select an image and run document detection on it
    this.props.navigator.push({
      screen: DemoScreens.CameraKitGalleryDemoScreen.id,
      title: DemoScreens.CameraKitGalleryDemoScreen.title,
      passProps: {
        onImageSelected: this.onGalleryImageSelected.bind(this),
      }
    });
  }

  onGalleryImageSelected(imageFileUri: String) {
    this.goBack();

    this.debugLog('onGalleryImageSelected imageFileUri: ' + imageFileUri);

    let fileUri = (imageFileUri.startsWith('file://') ? imageFileUri : 'file://' + imageFileUri);
    this.runDocumentDetectionOnGalleryImage(fileUri);
  }

  runDocumentDetectionOnGalleryImage(galleryImageFileUri: String) {
    if (!galleryImageFileUri) {
      Alert.alert('Image required', 'Please select an image from the Photo Gallery.');
      return;
    }

    this.showSpinner();
    let options = {
      imageFileUri: galleryImageFileUri,
      imageCompressionQuality: DemoConstants.JPG_QUALITY
    };
    ScanbotSDK.detectDocument(options, (result) => {
      this.hideSpinner();
      this.debugLog('detectDocument result: ' + JSON.stringify(result));
      this.setState({
        documentImageFileUri: result.imageFileUri,
        originalImageFileUri: galleryImageFileUri,
        filteredImageFileUri: null
      });
    },
    (error) => {
      this.hideSpinner();
      this.debugLog('detectDocument error: ' + JSON.stringify(error));
    });
  }

  createPDFButtonTapped() {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();

    let imageUri = this.state.filteredImageFileUri || this.state.documentImageFileUri;
    let options = { imageFileUris: [imageUri] }; // add more images here
    ScanbotSDK.createPDF(options, (result) => {
      this.hideSpinner();
      this.debugLog('createPDF result: ' + JSON.stringify(result));
      // PDF file created - Please check result.pdfFileUri
    },
    (error) => {
      this.hideSpinner();
      this.debugLog('createPDF error: ' + JSON.stringify(error));
    });
  }

  getOCRConfigsButtonTapped() {
    ScanbotSDK.getOCRConfigs((result) => {
      this.debugLog('getOCRConfigs result: ' + JSON.stringify(result));
    },
    (error) => {
      this.debugLog('getOCRConfigs error: ' + JSON.stringify(error));
    });
  }

  performOCRButtonTapped() {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();

    let imageUri = this.state.filteredImageFileUri || this.state.documentImageFileUri;
    let options = {
      imageFileUris: [imageUri], // add more images here
      languages: ['en', 'de'], // run OCR for languages english and german
      outputFormat: OCROutputFormat.FULL_OCR_RESULT
    };
    ScanbotSDK.performOCR(options, (result) => {
      this.hideSpinner();
      this.debugLog('performOCR result: ' + JSON.stringify(result));
      // Sandwiched PDF file with OCR created - Please check result.pdfFileUri
    },
    (error) => {
      this.hideSpinner();
      this.debugLog('performOCR error: ' + JSON.stringify(error));
    });
  }

  sdkCleanupButtonTapped() {
    ScanbotSDK.cleanup((result) => {
      this.debugLog('cleanup result: ' + JSON.stringify(result));
      this.setState({
        documentImageFileUri: null,
        originalImageFileUri: null,
        filteredImageFileUri: null
      });
    },
    (error) => {
      this.debugLog('cleanup error: ' + JSON.stringify(error));
    });
  }

  rotateImageCWButtonTapped() {
    // romate image clockwise
    this.rotateImage(-90);
  }

  rotateImageCCWButtonTapped() {
    // romate image counter clockwise
    this.rotateImage(90);
  }

  rotateImage(degrees: Number) {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();

    let options = {
      imageFileUri: this.state.documentImageFileUri,
      degrees: degrees,
      imageCompressionQuality: DemoConstants.JPG_QUALITY
    };
    ScanbotSDK.rotateImage(options, (result) => {
      this.hideSpinner();
      this.debugLog('rotateImage result: ' + JSON.stringify(result));
      this.setState({
        documentImageFileUri: result.imageFileUri,
        originalImageFileUri: this.state.originalImageFileUri,
        filteredImageFileUri: null
      });
    },
    (error) => {
      this.hideSpinner();
      this.debugLog('rotateImage error: ' + JSON.stringify(error));
    });
  }

  checkDocumentImage(showAlert: Boolean) {
    if (this.state.documentImageFileUri) {
      return true;
    }
    else {
      if (showAlert) { Alert.alert('Document image required', 'Please snap an image via Camera UI.'); }
      return false;
    }
  }

  checkOriginalImage(showAlert: Boolean) {
    if (this.state.originalImageFileUri) {
      return true;
    }
    else {
      if (showAlert) { Alert.alert('Original image required', 'Please snap an image via Camera UI.'); }
      return false;
    }
  }

  onImageCaptured(event: Event) {
    console.log(event.nativeEvent);
  }

  onDocumentImageCaptured(event: Event) {
    this.goBack();

    this.debugLogEventResult('onDocumentImageCaptured', event);

    this.setState({
      documentImageFileUri: event.nativeEvent.imageFileUri,
      originalImageFileUri: event.nativeEvent.originalImageFileUri,
      filteredImageFileUri: null
    });
  }

  onChangesAppliedWithPolygon(event: Event) {
    this.goBack();

    this.debugLogEventResult('onChangesAppliedWithPolygon', event);

    this.setState({
      documentImageFileUri: event.nativeEvent.imageFileUri,
      originalImageFileUri: this.state.originalImageFileUri,
      filteredImageFileUri: null
    });
  }

  onChangesCanceled(event: Event) {
    this.goBack();
    console.log(event.nativeEvent);
  }

  goBack() {
    this.props.navigator.pop({
      animated: true
    });
  }

  renderDocumentImage() {
    let imageUri = this.state.documentImageFileUri;
    if (this.state.filteredImageFileUri) {
      imageUri = this.state.filteredImageFileUri;
    }
    if (imageUri) {
      return (
          <Image source={{uri: imageUri}} style={styles.documentImage}/>
      );
    }
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  debugLog(msg: String) {
    console.log(msg);
    this.setState({
      debugText: msg
    });
  }

  debugLogEventResult(msg: String, event: Event) {
    console.log(msg);
    this.setState({
      debugText: msg + ": " + JSON.stringify(event.nativeEvent)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  demoButtonPanel: {
    margin: 10,
  },
  documentImage: {
    width: 400,
    height: 400,
    resizeMode: Image.resizeMode.contain,
    margin: 10,
  },
  debugOutputHeader: {
    margin: 10,
    fontWeight: 'bold',
  },
  debugOutputContent: {
    margin: 10,
    marginTop: 0,
    fontFamily: 'Courier',
  },
});
