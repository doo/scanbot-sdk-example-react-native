import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';

import Spinner from 'react-native-loading-spinner-overlay';

import ScanbotSDK, { Page, Point } from 'react-native-scanbot-sdk';

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
      pages: [],
      selectedPage: null,
      spinnerVisible: false,
      debugText: ""
    };

    this.initializeSDK();

    this.props.navigator.setOnNavigatorEvent(evt => {
      switch (evt.id) {
        case 'willAppear':
          this.refreshPages();
          break;
      }
    });
  }

  render() {
    return (
        <ScrollView onLayout={this.onLayout}>

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
            title="Show Stored Pages"
            onPress={this.showStoredPagesTapped}/>

          <RowButton
            title="Start Document Scanner"
            onPress={this.startScanbotCameraButtonTapped}/>

          <View style={styles.container}>
            {this.renderPickedImages()}
          </View>

          <View style={styles.container}>
            {this.renderDocumentImage()}
          </View>

          {
            this.state.pages.length == 0 && <Text style={styles.infoblock}>
              Snap some photos or select existing ones.
            </Text>
          }

          <RowButton
            title="Open Cropping Screen"
            onPress={this.startScanbotCroppingButtonTapped}/>

          <RowButton
            title="Auto-crop page"
            onPress={this.autoCropPageTapped}/>

          <RowButton
            title="Auto-crop image"
            onPress={this.autoCropImageTapped}/>

          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <Button
                title="Rotate Image CCW"
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
            title="Create TIFF"
            onPress={this.createTiffTapped}/>

          <RowButton
            title="Reset Selected Pages"
            onPress={this.resetSelectedPagesTapped}/>

          <RowButton
            title="Get OCR Configs"
            onPress={this.getOCRConfigsButtonTapped} />

          <RowButton
            title="Perform OCR"
            onPress={this.performOCRButtonTapped} />

          <RowButton
            title="Is License Valid Check"
            onPress={this.isLicenseValidButtonTapped} />

          <RowButton
            title="Open MRZ Scanner"
            onPress={this.openMrzScannerTapped}/>

          <RowButton
            title="Open Barcode Scanner"
            onPress={this.openBarcodeScannerTapped}/>

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

  onLayout = evt => {
    const {width} = evt.nativeEvent.layout;
    this.setState({width});
  }

  startScanbotCameraButtonTapped = async () => {
    const result = await ScanbotSDK.UI.startDocumentScanner({
      multiPageButtonTitle: 'Multiple Pages',
      polygonColor: '#00ffff',
      polygonLineWidth: 10,
      flashButtonHidden: true,
      imageScale: 1,
    });

    this.debugLog(`DocumentScanner result: ${JSON.stringify(result)}`);

    if (result.status == "OK") {
      this.setPages(this.state.pages.concat(result.pages));
    }
  }

  startScanbotCroppingButtonTapped = async () => {
    if (!this.checkSelectedOriginal()) { return; }

    const result = await ScanbotSDK.UI.startCroppingScreen(this.state.selectedPage, {});
    this.debugLog(`CroppingScreen result: ${JSON.stringify(result)}`);

    if (result.status == "OK") {
      this.updatePage(result.page);
    }
  }

  openMrzScannerTapped = async () => {
    const result = await ScanbotSDK.UI.startMrzScanner({
      finderTextHint: "Put passport here ^^^",
      finderHeight: this.state.width / 5,
    });
    this.debugLog(`MRZ result: ${JSON.stringify(result)}`);
  }

  openBarcodeScannerTapped = async () => {
    const result = await ScanbotSDK.UI.startBarcodeScanner({
      barcodeFormats: ["QR_CODE"],
      cancelButtonTitle: "Abort"
    });
    this.debugLog(`Barcode result: ${JSON.stringify(result)}`);
  }

  autoCropImageTapped = async () => {
    if (!this.checkSelectedOriginal()) { return; }

    try {
      this.showSpinner();
      const {selectedPage} = this.state;
      const result = await ScanbotSDK.detectDocument(selectedPage.originalImageFileUri);
      this.debugLog(`detectDocument result: ${JSON.stringify(result)}`);
      if (result.detectionResult.startsWith("OK")) {
        this.replaceDocumentUri(selectedPage, result.documentImageFileUri, result.polygon);
      }
    } finally {
      this.hideSpinner();
    }
  }

  autoCropPageTapped = async () => {
    if (!this.checkSelectedOriginal()) { return; }

    try {
      this.showSpinner();
      const page = await ScanbotSDK.detectDocumentOnPage(this.state.selectedPage);
      if (page) {
        this.updatePage(page);
      }
    } finally {
      this.hideSpinner();
    }
  }

  applyImageFilterButtonTapped = async () => {
    if (!this.checkSelectedDocument()) { return; }

    this.showSpinner();
    try {
      const {selectedPage} = this.state;
      const result = await ScanbotSDK.applyImageFilter(selectedPage.documentImageFileUri, "BINARIZED");
      this.debugLog('applyImageFilter result: ' + JSON.stringify(result));
      await this.replaceDocumentUri(selectedPage, result.imageFileUri);
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

  showStoredPagesTapped = () => {
    this.props.navigator.push({
      screen: DemoScreens.ReviewScreen.id,
      title: DemoScreens.ReviewScreen.title,
      passProps: {
        onPageSelected: this.onStoredPageSelected,
      }
    });
  }

  onGalleryImageSelected = async (imageFileUri: String) => {
    this.goBack();

    const page = await ScanbotSDK.createPage(imageFileUri);
    this.debugLog('onGalleryImageSelected page: ' + JSON.stringify(page));
    this.onStoredPageSelected(page);
  }
  
  onStoredPageSelected = (page: Page) => {
    const {pages} = this.state;
    if (!_.find(pages, p => p.pageId == page.pageId)) {
      pages.push(page);
    }
    this.setState({pages, selectedPage: page});
  }

  createPDFButtonTapped = async () => {
    if (!this.checkAllDocumentImages(true)) { return; }

    this.showSpinner();
    try {
      const imageUris = this.state.pages.map(p => p.documentImageFileUri || p.originalImageFileUri);
      const result = await ScanbotSDK.createPDF(imageUris);
      this.debugLog('createPDF result: ' + JSON.stringify(result));
      Alert.alert('PDF created', result.pdfFileUri);
    } finally {
      this.hideSpinner();
    }
  }

  createTiffTapped = async () => {
    if (!this.checkAllDocumentImages(true)) { return; }

    this.showSpinner();
    try {
      const imageUris = this.state.pages.map(p => p.documentImageFileUri || p.originalImageFileUri);
      const result = await ScanbotSDK.writeTIFF(imageUris, {oneBitEncoded: true});
      this.debugLog('writeTiff result: ' + JSON.stringify(result));
      Alert.alert('TIFF created', result.tiffFileUri);
    } finally {
      this.hideSpinner();
    }
  }

  resetSelectedPagesTapped = () => {
    this.setState({
      pages: [],
      selectedPage: null,
    })
  }

  getOCRConfigsButtonTapped = async () => {
    const result = await ScanbotSDK.getOCRConfigs();
    this.debugLog('getOCRConfigs result: ' + JSON.stringify(result));
  }

  performOCRButtonTapped = async () => {
    if (!this.checkSelectedDocument()) { return; }

    this.showSpinner();
    try {
      let imageUri = this.state.selectedPage.documentImageFileUri;
      const result = await ScanbotSDK.performOCR([imageUri], ['en', 'de'], {outputFormat: "PLAIN_TEXT"});
      this.debugLog('performOCR result: ' + JSON.stringify(result));
    } finally {
      this.hideSpinner();
    }
  }

  sdkCleanupButtonTapped = async () => {
    this.resetSelectedPagesTapped();
    await ScanbotSDK.cleanup();
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
    if (!this.checkSelectedDocument()) { return; }

    this.showSpinner();

    try {
      const {selectedPage} = this.state;
      const result = await ScanbotSDK.rotateImage(selectedPage.documentImageFileUri, degrees);
      this.debugLog('rotateImage result: ' + JSON.stringify(result));
      await this.replaceDocumentUri(selectedPage, result.imageFileUri);
    } finally {
      this.hideSpinner();
    }
  }

  checkAllDocumentImages = () => {
    const {pages} = this.state;
    if (pages.length > 0 && _.every(pages, p => p && p.documentImageFileUri)) {
      return true;
    } else {
      Alert.alert('Document image required', "Some selected images have not yet been cropped. Crop any remaining uncropped images and try again.");
      return false;
    }
  }

  checkSelectedDocument = () => {
    const {selectedPage} = this.state;
    if (selectedPage && selectedPage.documentImageFileUri) {
      return true;
    } else {
      Alert.alert('Document image required', 'Snap a document or crop an image that was chosen from the gallery.');
      return false;
    }
  }

  checkSelectedOriginal = () => {
    const {selectedPage} = this.state;
    if (selectedPage) {
      return true;
    } else {
      Alert.alert('Image required', 'Snap a document or open one from the gallery.');
      return false;
    }
  }

  goBack() {
    this.props.navigator.pop({
      animated: true
    });
  }

  refreshPages = async () => {
    const allPages = await ScanbotSDK.getStoredPages();
    const pageDict = _.fromPairs(allPages.map(p => [p.pageId, p]));

    let {pages, selectedPage} = this.state;
    _.remove(pages, p => !pageDict[p.pageId]);
    if (selectedPage && !pageDict[selectedPage.pageId]) {
      selectedPage = _.last(allPages);
    }
    this.setState({pages, selectedPage});
  }

  updatePage = (newPage: Page) => {
    const {pages} = this.state;
    const i = _.findIndex(pages, p => p.pageId == newPage.pageId);
    if (i !== -1) {
      pages[i] = newPage;
    }
    
    this.setPages(pages, newPage);
  }

  setPages = (pages: Page[], selectedPage: Page) => {
    this.setState({
      pages: pages,
      selectedPage: selectedPage ? _.find(pages, p => p.pageId == selectedPage.pageId) : _.last(pages)
    });
  }

  replaceDocumentUri = async (page: Page, documentUri: String, polygon: Point[] = null) => {
    page = await ScanbotSDK.setDocumentImage(page, documentUri);
    if (polygon) {
      page.polygon = polygon;
    }

    this.updatePage(page);
    this.setPages(this.state.pages, page);
  }

  renderPickedImages() {
    let {pages} = this.state;
    if (pages) {
      return pages.map((p, i) => <TouchableHighlight key={i} onPress={() => this.onPickedImageSelected(p)}>
          <Image
            style={styles.galleryImage}
            source={{uri:p.documentPreviewImageFileUri || p.originalPreviewImageFileUri}}
          />
        </TouchableHighlight>);
    }
  }

  onPickedImageSelected = (page: Page) => {
    this.setState({selectedPage: page});
  }

  renderDocumentImage() {
    let {selectedPage} = this.state;
    if (selectedPage) {
      return <Image
        style={styles.documentImage}
        source={{uri:selectedPage.documentPreviewImageFileUri || selectedPage.originalPreviewImageFileUri}}
        />;
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  infoblock: {
    textAlign: 'center',
    backgroundColor: '#aaa',
    margin: 10,
    height: 100,
    textAlignVertical: 'center'
  },
  demoButtonPanel: {
    margin: 10,
  },
  documentImage: {
    width: 400,
    height: 400,
    resizeMode: Image.resizeMode.contain,
  },
  galleryImage: {
    width: 80,
    height: 80,
    resizeMode: Image.resizeMode.contain,
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
