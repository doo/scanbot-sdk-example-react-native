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
import _ from 'lodash';

import Spinner from 'react-native-loading-spinner-overlay';

import { ScanbotSDK, ImageFilter, OCROutputFormat, Page } from 'react-native-scanbot-sdk';

import { DemoScreens, DemoConstants } from '.';

class RowButton extends Component {
  render() {
    const {title, onPress} = this.props;
    return (
      <View style={styles.demoButtonPanel}>
        <Button
            title={title}
            onPress={onPress} />
      </View>
      );
  }
}

export default class MainScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
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

          <RowButton
            title="Pick Image"
            onPress={this.pickImageTapped}/>

          <RowButton
            title="Start Document Scanner"
            onPress={this.startScanbotCameraButtonTapped}/>


          <RowButton
            title="Open Cropping Screen"
            onPress={this.startScanbotCroppingButtonTapped}/>

          <View style={styles.container}>
            {this.renderDocumentImage()}
          </View>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <Button
                title="Rotate Image CCW️"
                onPress={this.rotateImageCCWButtonTapped} />
            <Button
                title="Rotate Image CW"
                onPress={this.rotateImageCWButtonTapped} />
          </View>

          <RowButton
            title="Apply Image Filter"
            onPress={this.applyImageFilterButtonTapped}/>

          <RowButton
            title="Create PDF"
            onPress={this.createPDFButtonTapped} />

          <RowButton
            title="Get OCR Configs"
            onPress={this.getOCRConfigsButtonTapped} />

          <RowButton
            title="Perform OCR"
            onPress={this.performOCRButtonTapped} />

          <RowButton
            title="Open MRZ Scanner"
            onPress={this.openMrzScannerTapped}/>

          <RowButton
            title="Open Barcode Scanner"
            onPress={this.openBarcodeScannerTapped}/>

          <RowButton
            title="Is License Valid Check"
            onPress={this.isLicenseValidButtonTapped} />

          <RowButton
            title="SDK Cleanup"
            onPress={this.sdkCleanupButtonTapped} />

          <Text style={styles.debugOutputHeader}>
            {'DEBUG OUTPUT:'}
          </Text>
          <Text style={styles.debugOutputContent}>
            {this.state.debugText}
          </Text>

        </ScrollView>
    );
  }

  async initializeSDK() {
    let options = { licenseKey: DemoConstants.scanbotLicenseKey, loggingEnabled: true };
    try {
      var result = await ScanbotSDK.initializeSDK(options);
      this.debugLog('initializeSDK result: ' + JSON.stringify(result));
    } catch (ex) {
      this.debugLog('initializeSDK error: ' + JSON.stringify(ex.error));
    }
  }

  isLicenseValidButtonTapped = async () => {
    const result = await ScanbotSDK.isLicenseValid();
    this.debugLog('isLicenseValid result: ' + JSON.stringify(result));
  }

  startScanbotCameraButtonTapped = async () => {
    const result = await ScanbotSDK.UI.launchDocumentScanner({
      multiPageButtonTitle: 'mooltaypage',
      polygonColor: '#00ffff',
      polygonLineWidth: 10,
      flashButtonHidden: true,
      imageScale: 1,
    });

    this.debugLog(`DocumentScanner result: ${JSON.stringify(result)}`);

    if (result.status == "OK") {
      this.setPages(result.pages);
    }
  }

  startScanbotCroppingButtonTapped = async () => {
    if (!this.checkOriginalImage(true)) { return; }

    const result = await ScanbotSDK.UI.launchCroppingScreen(this.state.pages[0], {});
    this.debugLog(`CroppingScreen result: ${JSON.stringify(result)}`);

    if (result.status == "OK") {
      const pages = _.clone(this.state.pages);
      pages[0] = result.page;
      this.setPages(pages);
    }
  }

  openMrzScannerTapped = async () => {
    const result = await ScanbotSDK.UI.launchMrzScanner({
      finderTextHint: "Put passport here ^^^"
    });
    this.debugLog(`MRZ result: ${JSON.stringify(result)}`);
  }

  openBarcodeScannerTapped = async () => {
    const result = await ScanbotSDK.UI.launchBarcodeScanner({
      barcodeFormats: ["QR_CODE"],
      cancelButtonTitle: "Abort"
    });
    this.debugLog(`Barcode result: ${JSON.stringify(result)}`);
  }

  applyImageFilterButtonTapped = async () => {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();
    try {
      const result = await ScanbotSDK.applyImageFilter(this.state.pages[0].documentImageFileUri, ImageFilter.BINARIZED);
      this.debugLog('applyImageFilter result: ' + JSON.stringify(result));
      await this.replaceDocumentUriOnFirstPage(result.imageFileUri);
    } finally {
      this.hideSpinner();
    }
  }

  pickImageTapped = () => {
    // Open photo gallery to select an image and run document detection on it
    this.props.navigator.push({
      screen: DemoScreens.CameraKitGalleryDemoScreen.id,
      title: DemoScreens.CameraKitGalleryDemoScreen.title,
      passProps: {
        onImageSelected: this.onGalleryImageSelected,
      }
    });
  }

  onGalleryImageSelected = async (imageFileUri: String) => {
    this.goBack();

    this.debugLog('onGalleryImageSelected imageFileUri: ' + imageFileUri);

    const page = await ScanbotSDK.UI.createPage(imageFileUri);
    this.setPages([page]);
  }

  // runDocumentDetectionOnGalleryImage(galleryImageFileUri: String) {
  //   if (!galleryImageFileUri) {
  //     Alert.alert('Image required', 'Please select an image from the Photo Gallery.');
  //     return;
  //   }

  //   this.showSpinner();
  //   let options = {
  //     imageFileUri: galleryImageFileUri,
  //     imageCompressionQuality: DemoConstants.JPG_QUALITY
  //   };
  //   ScanbotSDK.detectDocument(options, (result) => {
  //     this.hideSpinner();
  //     this.debugLog('detectDocument result: ' + JSON.stringify(result));
  //     this.setState({
  //       documentImageFileUri: result.imageFileUri,
  //       originalImageFileUri: galleryImageFileUri,
  //       filteredImageFileUri: null
  //     });
  //   },
  //   (error) => {
  //     this.hideSpinner();
  //     this.debugLog('detectDocument error: ' + JSON.stringify(error));
  //   });
  // }

  createPDFButtonTapped = async () => {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();
    try {
      const imageUris = this.state.pages.map(p => p.documentImageFileUri || p.originalImageFileUri);
      const result = await ScanbotSDK.createPDF(imageUris);
      this.debugLog('createPDF result: ' + JSON.stringify(result));
    } finally {
      this.hideSpinner();
    }
  }

  getOCRConfigsButtonTapped = async () => {
    const result = await ScanbotSDK.getOCRConfigs();
    this.debugLog('getOCRConfigs result: ' + JSON.stringify(result));
  }

  performOCRButtonTapped = async () => {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();
    try {
      let imageUri = this.state.pages[0].documentImageFileUri;
      const result = await ScanbotSDK.performOCR([imageUri], ['en', 'de'], {outputFormat: OCROutputFormat.PLAIN_TEXT});
      this.debugLog('performOCR result: ' + JSON.stringify(result));
    } finally {
      this.hideSpinner();
    }
  }

  sdkCleanupButtonTapped = async () => {
    await ScanbotSDK.cleanup();
    this.setState({
      pages: null
    });
    this.debugLog("Cleanup finished");
  }

  rotateImageCWButtonTapped = () => {
    // romate image clockwise
    this.rotateImage(-90);
  }

  rotateImageCCWButtonTapped = () => {
    // romate image counter clockwise
    this.rotateImage(90);
  }

  rotateImage = async (degrees: Number) => {
    if (!this.checkDocumentImage(true)) { return; }

    this.showSpinner();

    try {
      const result = await ScanbotSDK.rotateImage(this.state.pages[0].documentImageFileUri, degrees);
      this.debugLog('rotateImage result: ' + JSON.stringify(result));
      await this.replaceDocumentUriOnFirstPage(result.imageFileUri);
    } finally {
      this.hideSpinner();
    }
  }

  checkDocumentImage = (showAlert: Boolean) => {
    const {pages} = this.state;
    if (_.every(pages, p => p && p.documentImageFileUri)) {
      return true;
    } else {
      if (showAlert) {
        Alert.alert('Document image required', 'Snap a document or crop an image that was chosen from the gallery.');
      }
      return false;
    }
  }

  checkOriginalImage(showAlert: Boolean) {
    const {pages} = this.state;
    if (_.some(pages)) {
      return true;
    } else {
      if (showAlert) {
        Alert.alert('Image required', 'Snap a document or open one from the gallery.');
      }
      return false;
    }
  }

  goBack() {
    this.props.navigator.pop({
      animated: true
    });
  }

  setPages = (pages: Page[]) => {
    const timestamp = `?t=${new Date().getTime()}`;
    this.setState({
      pages: pages.map((p, i) => Object.assign(p, {
        originalImageFileUri: p.originalImageFileUri + timestamp,
        documentImageFileUri: p.documentImageFileUri + timestamp,
        originalPreviewImageFileUri: p.originalPreviewImageFileUri + timestamp,
        documentPreviewImageFileUri: p.documentPreviewImageFileUri + timestamp,
      }))
    });
  }

  replaceDocumentUriOnFirstPage = async (documentUri: String) => {
    const {pages} = this.state;
    pages[0] = await ScanbotSDK.UI.setDocumentImage(pages[0], documentUri);
    this.setPages(pages);
  }

  renderDocumentImage() {
    let {pages} = this.state;
    if (pages) {
      return pages.map((p, i) => <Image
        key={i}
        style={styles.documentImage}
        source={{uri:p.documentPreviewImageFileUri || p.originalPreviewImageFileUri}}
        />);
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
