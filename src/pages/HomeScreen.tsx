import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Platform,
  SafeAreaView,
  SectionList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScanbotSDK, {
  BarcodeScannerConfiguration,
  DocumentScannerConfiguration,
  MrzScannerConfiguration,
  NFCPassportReaderConfiguration,
} from 'react-native-scanbot-sdk';

import {Examples, FeatureId} from '../model/Examples';
import {Styles} from '../model/Styles';
import {ImageUtils} from '../utils/ImageUtils';
import {SDKUtils} from '../utils/SDKUtils';
import {Pages} from '../model/Pages';
import {ViewUtils} from '../utils/ViewUtils';
import {BarcodeFormats} from '../model/BarcodeFormats';
import {BarcodeDocumentFormats} from '../model/BarcodeDocumentFormats';
import {Navigation} from '../utils/Navigation';
import {BaseScreen} from '../utils/BaseScreen';
import {Colors} from '../model/Colors';
import {
  BatchBarcodeScannerConfiguration,
  HealthInsuranceCardScannerConfiguration,
  IdCardScannerConfiguration,
} from 'react-native-scanbot-sdk/src';
import {PageStorage} from '../utils/PageStorage';

import {
  LicensePlateScannerConfiguration,
  TextDataScannerConfiguration,
} from 'react-native-scanbot-sdk/src/configuration';

import {LicensePlateDetectorMode} from 'react-native-scanbot-sdk/src/enum';
import {FileUtils} from '../utils/FileUtils';

export class HomeScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount(): Promise<void> {
    try {
      const loaded = await PageStorage.INSTANCE.load();
      console.log(`Loaded ${loaded.length} pages from storage`);
      if (loaded.length === 0) {
        return;
      }
      const refreshed = await ScanbotSDK.refreshImageUris({pages: loaded});
      await Pages.addList(refreshed.pages);
    } catch (e) {
      console.error('Error loading/refreshing pages: ' + JSON.stringify(e));
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />

        <SafeAreaView>
          <ActivityIndicator
            size="large"
            color={Styles.SCANBOT_RED}
            style={Styles.INSTANCE.common.progress}
            animating={this.progressVisible}
          />
          <SectionList
            style={Styles.INSTANCE.home.list}
            sections={Examples.list}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item}) => (
              <View style={Styles.INSTANCE.home.sectionItemContainer}>
                <TouchableOpacity onPress={() => this.onListItemClick(item)}>
                  <Text
                    style={
                      item.customStyle
                        ? item.customStyle.content
                        : Styles.INSTANCE.home.sectionItem
                    }>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => (
              <Text style={Styles.INSTANCE.home.sectionHeader}>{title}</Text>
            )}
          />
        </SafeAreaView>
        <Text style={Styles.INSTANCE.common.copyrightLabel}>
          Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
        </Text>
      </>
    );
  }

  async onListItemClick(item: any) {
    if (item.id === FeatureId.LearnMore) {
      await Linking.openURL('https://scanbot.io');
      return;
    }

    if (item.id === FeatureId.LicenseInfo) {
      const info = await ScanbotSDK.getLicenseInfo();
      ViewUtils.showAlert(JSON.stringify(info));
      return;
    }

    if (!(await SDKUtils.checkLicense())) {
      return;
    }

    switch (item.id) {
      case FeatureId.DocumentScanner:
        this.startDocumentScanner();
        break;
      case FeatureId.DetectDocumentFromPage:
        this.importImageAndDetectDocument();
        break;
      case FeatureId.DetectDocumentFromImage:
        this.detectDocumentFromFile();
        break;
      case FeatureId.ExtractPagesFromPdf:
        this.importPdfAndExtractPages();
        break;
      case FeatureId.ExtractImagesFromPdf:
        this.importPdfAndExtractImages();
        break;
      case FeatureId.ViewPages:
        this.viewImageResults();
        break;
      case FeatureId.ScanBarcodes:
        this.startBarcodeScanner();
        break;
      case FeatureId.ScanBatchBarcodes:
        this.startBatchBarcodeScanner();
        break;
      case FeatureId.DetectBarcodesOnStillImage:
        this.importImageAndDetectBarcodes();
        break;
      case FeatureId.DetectBarcodesOnStillImages:
        this.importImagesAndDetectBarcodes();
        break;
      case FeatureId.BarcodeFormatsFilter:
        this.setBarcodeFormats();
        break;
      case FeatureId.BarcodeDocumentFormatsFilter:
        this.setBarcodeDocumentFormats();
        break;
      case FeatureId.ScanMRZ:
        this.startMRZScanner();
        break;
      case FeatureId.ScanEHIC:
        this.startEHICScanner();
        break;
      case FeatureId.ScanIdCard:
        this.startIdCardCScanner();
        break;
      case FeatureId.ReadPassportNFC:
        this.startNFCReader();
        break;
      case FeatureId.OcrConfigs:
        const result = await ScanbotSDK.getOCRConfigs();
        ViewUtils.showAlert(JSON.stringify(result));
        break;
      case FeatureId.LicensePlateScannerML:
        this.startLicensePlateScanner('ML_BASED');
        break;
      case FeatureId.LicensePlateScannerClassic:
        this.startLicensePlateScanner('CLASSIC');
        break;
      case FeatureId.TextDataScanner:
        this.startTextDataScanner();
        break;
    }
  }

  async startDocumentScanner() {
    const config: DocumentScannerConfiguration = {
      // Customize colors, text resources, etc..
      polygonColor: '#00ffff',
      bottomBarBackgroundColor: Colors.SCANBOT_RED,
      topBarBackgroundColor: Colors.SCANBOT_RED,
      cameraBackgroundColor: Colors.SCANBOT_RED,
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
      // documentImageSizeLimit: { width: 2000, height: 3000 },
      // maxNumberOfPages: 3,
      // See further config properties ...
    };

    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    if (result.status === 'OK') {
      await Pages.addList(result.pages);
      this.pushPage(Navigation.IMAGE_RESULTS);
    }
  }

  async startTextDataScanner() {
    const config: TextDataScannerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
      guidanceText: 'Place the LC display in the frame to scan it',
      textFilterStrategy: 'DOCUMENT',
    };

    // eg.
    // config.validationBlock = new JSStringToBoolTextFunctionBuilder(
    //   (value: string) => {
    //     return value.length > 4;
    //   },
    // ).build();

    // config.stringSanitizerBlock = new JSStringToStringTextFunctionBuilder(
    //   (value: string) => {
    //     return value.toLowerCase() + value.toUpperCase();
    //   },
    // ).build();

    try {
      const result = await ScanbotSDK.UI.startTextDataScanner(config);
      const data = result.result;
      if (result.status === 'OK' && data) {
        ViewUtils.showAlert(JSON.stringify(result));
      }
    } catch (err) {
      ViewUtils.showAlert('Unexpected error');
    }
  }

  async startLicensePlateScanner(
    detectorMode: LicensePlateDetectorMode = 'ML_BASED',
  ) {
    let config: LicensePlateScannerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
      detectorMode: detectorMode,
    };

    const result = await ScanbotSDK.UI.startLicensePlateScanner(config);

    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result));
    }
  }

  async importPdfAndExtractPages() {
    const result = await FileUtils.pickPdf();
    if (result.status === 'CANCELED') {
      return;
    }

    const fileUrl = result.fileUrl;
    if (result.status === 'ERROR' || !fileUrl) {
      ViewUtils.showAlert(`ERROR: ${result.error ?? 'Unknown'}`);
      return;
    }

    this.showProgress();

    const sdkResult = await ScanbotSDK.extractPagesFromPdf({
      pdfFilePath: fileUrl,
      // eg.
      // quality: 100,
      // scaling: 4,
    });

    this.hideProgress();

    if (sdkResult.status !== 'OK' || !sdkResult.pages) {
      return;
    }

    await Pages.addList(sdkResult.pages);
    this.pushPage(Navigation.IMAGE_RESULTS);
  }

  async importPdfAndExtractImages() {
    const result = await FileUtils.pickPdf();
    if (result.status === 'CANCELED') {
      return;
    }

    const fileUrl = result.fileUrl;
    if (result.status === 'ERROR' || !fileUrl) {
      ViewUtils.showAlert(`ERROR: ${result.error ?? 'Unknown'}`);
      return;
    }

    this.showProgress();

    const sdkResult = await ScanbotSDK.extractImagesFromPdf({
      pdfFilePath: fileUrl,
      // eg.
      // quality: 80,
      // scaling: 3,
    });

    this.hideProgress();

    const imageFilesUrls = sdkResult.imageFilesUrls;

    if (sdkResult.status !== 'OK' || !imageFilesUrls) {
      return;
    }

    ViewUtils.showAlert(JSON.stringify(imageFilesUrls));
  }

  async importImageAndDetectDocument() {
    const result = await ImageUtils.pickFromGallery();
    this.showProgress();

    if (result.didCancel) {
      this.hideProgress();
      return;
    }

    if (!result.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    let page = await ScanbotSDK.createPage(result.uri);
    page = await ScanbotSDK.detectDocumentOnPage(page);
    await Pages.add(page);
    this.hideProgress();
    this.pushPage(Navigation.IMAGE_RESULTS);
  }

  viewImageResults() {
    this.pushPage('Image Results');
  }

  async startBarcodeScanner() {
    const config: BarcodeScannerConfiguration = {
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 1, height: 1},
      useButtonsAllCaps: false,
      cameraZoomFactor: 0.7,
      // engineMode: "LEGACY"
    };
    const result = await ScanbotSDK.UI.startBarcodeScanner(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  async startBatchBarcodeScanner() {
    const config: BatchBarcodeScannerConfiguration = {
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 2, height: 1},
      useButtonsAllCaps: false,
      cameraZoomFactor: 1.0,
      // engineMode: "NEXT_GEN"
    };
    const result = await ScanbotSDK.UI.startBatchBarcodeScanner(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  async importImageAndDetectBarcodes() {
    this.showProgress();
    const pickerResult = await ImageUtils.pickFromGallery();

    if (pickerResult.didCancel) {
      this.hideProgress();
      return;
    }

    if (!pickerResult || !pickerResult.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    const result = await ScanbotSDK.detectBarcodesOnImage({
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      imageFileUri: pickerResult.uri,
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      stripCheckDigits: true,
    });
    this.hideProgress();
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  async importImagesAndDetectBarcodes() {
    this.showProgress();
    const pickerResult = await ImageUtils.pickMultipleImagesFromGallery();

    if (pickerResult.isCanceled || pickerResult.imagesUris.length === 0) {
      this.hideProgress();
      return;
    }

    if (pickerResult.error) {
      this.hideProgress();
      ViewUtils.showAlert(
        'Error picking image from gallery! ' + pickerResult.error,
      );
      return;
    }

    const result = await ScanbotSDK.detectBarcodesOnImages({
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      imageFileUris: pickerResult.imagesUris,
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      stripCheckDigits: true,
    });

    this.hideProgress();
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.results));
    }
  }

  setBarcodeFormats() {
    this.pushPage(Navigation.BARCODE_FORMATS);
  }

  setBarcodeDocumentFormats() {
    this.pushPage(Navigation.BARCODE_DOCUMENT_FORMATS);
  }

  async startMRZScanner() {
    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint:
        'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
    };

    if (Platform.OS === 'ios') {
      const {width} = Dimensions.get('window');
      config.finderWidth = width * 0.9;
      config.finderHeight = width * 0.18;
    }

    const result = await ScanbotSDK.UI.startMrzScanner(config);
    if (result.status === 'OK') {
      const fields = result.fields.map(
        f => `${f.name}: ${f.value} (${f.confidence.toFixed(2)})`,
      );
      ViewUtils.showAlert(fields.join('\n'));
    }
  }
  async startEHICScanner() {
    const config: HealthInsuranceCardScannerConfiguration = {
      finderLineColor: 'red',
    };
    const result = await ScanbotSDK.UI.startEHICScanner(config);
    if (result.status === 'OK') {
      const fields = result.fields.map(
        f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
      );
      ViewUtils.showAlert(fields.join('\n'));
    }
  }

  async startIdCardCScanner() {
    const config: IdCardScannerConfiguration = {};
    const result = await ScanbotSDK.UI.startIdCardScanner(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result));
    }
  }

  async startNFCReader() {
    const config: NFCPassportReaderConfiguration = {};
    const result = await ScanbotSDK.UI.startNFCPassportReader(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result));
    }
  }

  async detectDocumentFromFile() {
    this.showProgress();

    const pickerResult = await ImageUtils.pickFromGallery();

    if (pickerResult.didCancel) {
      this.hideProgress();
      return;
    }

    if (!pickerResult || !pickerResult.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    const imageFileUri = pickerResult.uri;

    try {
      const result = await ScanbotSDK.detectDocument(imageFileUri);
      ViewUtils.showAlert(JSON.stringify(result));
    } catch (_err) {}

    this.hideProgress();
  }
}
