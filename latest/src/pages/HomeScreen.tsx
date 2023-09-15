import React from 'react';
import {
  ActivityIndicator,
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
  AAMVADocumentFormat,
  BarcodeResultField,
  BarcodeScannerConfiguration,
  BaseDocumentFormat,
  BatchBarcodeScannerConfiguration,
  BoardingPassDocumentFormat,
  CheckRecognizerConfiguration,
  DocumentScannerConfiguration,
  GenericDocumentRecognizerConfiguration,
  GenericDocumentRecognizerResult,
  GS1DocumentFormat,
  HealthInsuranceCardScannerConfiguration,
  IDCardPDF417DocumentFormat,
  ImageFilter,
  LicensePlateScannerConfiguration,
  LicensePlateScanStrategy,
  MedicalCertificateDocumentFormat,
  MedicalCertificateRecognizerConfiguration,
  MedicalCertificateScannerResult,
  MedicalPlanDocumentFormat,
  MrzScannerConfiguration,
  SEPADocumentFormat,
  SwissQRCodeDocumentFormat,
  TextDataScannerConfiguration,
  VCardDocumentFormat,
} from 'react-native-scanbot-sdk';
// @ts-ignore
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';

import {Examples, FeatureId} from '../model/Examples';
import {Styles} from '../model/Styles';
import {ImageUtils} from '../utils/ImageUtils';
import {SDKUtils} from '../utils/SDKUtils';
import {Pages} from '../model/Pages';
import {ViewUtils} from '../utils/ViewUtils';
import {BarcodeFormats} from '../model/BarcodeFormats';
import {BarcodeDocumentFormats} from '../model/BarcodeDocumentFormats';
import {BaseScreen} from '../utils/BaseScreen';
import {Colors} from '../model/Colors';
import {PageStorage} from '../utils/PageStorage';

import {FileUtils} from '../utils/FileUtils';
import {Results} from '../model/Results';
import {Screens} from '../utils/Navigation';

const CANCEL_INDEX = 0;

export class HomeScreen extends BaseScreen {
  filterActionSheet: any;
  onFilterSelected?: (filter: ImageFilter) => void;
  getFilterActionSheetRef = (ref: any) => (this.filterActionSheet = ref);
  handleActionSheetPress = async (index: number) => {
    const filter = SDKUtils.IMAGE_FILTERS[index];
    const callback = this.onFilterSelected;
    if (!callback) {
      return;
    }
    callback(filter);
  };

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
            stickySectionHeadersEnabled={false}
            style={Styles.INSTANCE.home.list}
            sections={Examples.list}
            keyExtractor={(item, index) => item.title + index}
            renderItem={({item}: any) => {
              return (
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
              );
            }}
            renderSectionHeader={({section: {title}}) => (
              <Text style={Styles.INSTANCE.home.sectionHeader}>{title}</Text>
            )}
          />
        </SafeAreaView>
        <Text style={Styles.INSTANCE.common.copyrightLabel}>
          Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
        </Text>
        <ActionSheet
          ref={this.getFilterActionSheetRef}
          title={'Filters'}
          message="Choose an image filter to see how it enhances the document"
          options={SDKUtils.IMAGE_FILTERS}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handleActionSheetPress}
        />
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
      const dateStr = info.licenseExpirationDate;
      let text =
        '• The license is ' + (info.isLicenseValid ? 'VALID' : 'NOT VALID');
      text += '\n\n• Expiration Date: ' + (dateStr ? new Date(dateStr) : 'N/A');
      text += '\n\n• Status: ' + info.licenseStatus;
      ViewUtils.showAlert(text);
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
      case FeatureId.ApplyFilterOnImage:
        this.importImageAndApplyFilter();
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
      case FeatureId.ScanMedicalCertificate:
        this.startMedicalCertificateRecognizer();
        break;
      case FeatureId.ScanGenericDocument:
        this.startGenericDocumentRecognizer();
        break;
      case FeatureId.ScanEHIC:
        this.startEHICScanner();
        break;
      case FeatureId.OcrConfigs:
        const result = await ScanbotSDK.getOCRConfigs();
        ViewUtils.showAlert(JSON.stringify(result));
        break;
      case FeatureId.LicensePlateScannerML:
        this.startLicensePlateScanner('MlBased');
        break;
      case FeatureId.LicensePlateScannerClassic:
        this.startLicensePlateScanner('Classic');
        break;
      case FeatureId.TextDataScanner:
        this.startTextDataScanner();
        break;
      case FeatureId.CheckRecognizer:
        this.startCheckRecognizer();
        break;
      case FeatureId.RecognizeCheckOnImage:
        this.importImageAndRecognizeCheck();
        break;
      case FeatureId.BarcodeCameraViewComponent:
        this.goToBarcodeCameraViewComponentExample();
    }
  }

  async goToBarcodeCameraViewComponentExample() {
    this.pushPage(Screens.BARCODE_CAMERA_VIEW);
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
      this.pushPage(Screens.IMAGE_RESULTS);
    }
  }

  async startTextDataScanner() {
    const config: TextDataScannerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
      textDataScannerStep: {
        allowedSymbols: '',
        aspectRatio: {
          height: 1.0,
          width: 5.0,
        },
        guidanceText: 'Place the LC display in the frame to scan it',
        pattern: '',
        preferredZoom: 2.0,
        shouldMatchSubstring: false,
        significantShakeDelay: -1,
        textFilterStrategy: 'Document',
        unzoomedFinderHeight: 40,
      },
    };

    try {
      const result = await ScanbotSDK.UI.startTextDataScanner(config);
      const data = result?.result?.text;
      if (result.status !== 'OK' || !data) {
        return;
      }
      ViewUtils.showAlert(JSON.stringify(result));
    } catch (err: any) {
      ViewUtils.showAlert('Unexpected error: ' + err.message);
    }
  }

  async startCheckRecognizer() {
    const config: CheckRecognizerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
    };

    try {
      const result = await ScanbotSDK.UI.startCheckRecognizer(config);

      if (result.status !== 'OK') {
        // The operation was canceled by the user
        return;
      }

      Results.lastCheckRecognizerResult = result;

      this.pushPage(Screens.CHECK_RECOGNIZER_RESULT);

      console.log(JSON.stringify(result, undefined, 4));
    } catch (err: any) {
      ViewUtils.showAlert(err.message);
    }
  }

  async importImageAndRecognizeCheck() {
    const result = await ImageUtils.pickFromGallery();
    this.showProgress();

    if (result.didCancel || !result.assets) {
      this.hideProgress();
      return;
    }

    const pickedImage = result.assets[0];

    if (!pickedImage.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    try {
      let checkResult = await ScanbotSDK.recognizeCheck(pickedImage.uri);

      Results.lastCheckRecognizerResult = checkResult;

      this.hideProgress();
      this.pushPage(Screens.CHECK_RECOGNIZER_RESULT);
    } catch (err: any) {
      ViewUtils.showAlert(err.message);
      this.hideProgress();
    }
  }

  async startLicensePlateScanner(
    scanStrategy: LicensePlateScanStrategy = 'MlBased',
  ) {
    let config: LicensePlateScannerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
      scanStrategy: scanStrategy,
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

    try {
      const sdkResult = await ScanbotSDK.extractPagesFromPdf({
        pdfFilePath: fileUrl,
        // eg.
        // quality: 100,
        // scaling: 4,
      });

      if (sdkResult.status !== 'OK' || !sdkResult.pages) {
        return;
      }

      await Pages.addList(sdkResult.pages);
      this.pushPage(Screens.IMAGE_RESULTS);
    } catch (err: any) {
      ViewUtils.showAlert(err.message);
    }

    this.hideProgress();
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

    try {
      const sdkResult = await ScanbotSDK.extractImagesFromPdf({
        pdfFilePath: fileUrl,
        // eg.
        // quality: 80,
        // scaling: 3,
      });

      const imageFilesUrls = sdkResult.imageFilesUrls;

      if (sdkResult.status !== 'OK' || !imageFilesUrls) {
        return;
      }

      ViewUtils.showAlert(JSON.stringify(imageFilesUrls));
    } catch (err: any) {
      ViewUtils.showAlert(err.message);
    }

    this.hideProgress();
  }

  async importImageAndDetectDocument() {
    const result = await ImageUtils.pickFromGallery();
    this.showProgress();

    if (result.didCancel || !result.assets) {
      this.hideProgress();
      return;
    }

    const pickedImage = result.assets[0];

    if (!pickedImage.uri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return;
    }

    let page = await ScanbotSDK.createPage(pickedImage.uri);
    page = await ScanbotSDK.detectDocumentOnPage(page);
    await Pages.add(page);
    this.hideProgress();
    this.pushPage(Screens.IMAGE_RESULTS);
  }

  viewImageResults() {
    this.pushPage(Screens.IMAGE_RESULTS);
  }

  async startBarcodeScanner() {
    const config: BarcodeScannerConfiguration = {
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 1, height: 1},
      useButtonsAllCaps: false,
      barcodeImageGenerationType: 'NONE',
      // cameraZoomFactor: 0.7,
      // engineMode: "LEGACY"
    };

    const result = await ScanbotSDK.UI.startBarcodeScanner(config);
    if (result.status !== 'OK') {
      return;
    }

    // Example of document parsing:
    const barcodes = result.barcodes;
    if (!barcodes) {
      return;
    }
    const barcodeItem = barcodes[0];
    if (barcodeItem) {
      this.logBarcodeDocument(barcodeItem);
    }

    // Show the result
    ViewUtils.showAlert(JSON.stringify(result.barcodes));
  }

  async startBatchBarcodeScanner() {
    const config: BatchBarcodeScannerConfiguration = {
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 2, height: 1},
      useButtonsAllCaps: false,
      // cameraZoomFactor: 1.0,
      // engineMode: "NEXT_GEN"
    };

    const result = await ScanbotSDK.UI.startBatchBarcodeScanner(config);
    if (result.status !== 'OK') {
      return;
    }

    // Example of document parsing:
    const barcodes = result.barcodes;
    if (!barcodes) {
      return;
    }
    const barcodeItem = barcodes[0];
    if (barcodeItem) {
      this.logBarcodeDocument(barcodeItem);
    }

    // Show the result
    ViewUtils.showAlert(JSON.stringify(result.barcodes));
  }

  logBarcodeDocument(barcodeItem: BarcodeResultField) {
    const formattedResult = barcodeItem.formattedResult as BaseDocumentFormat;
    if (!formattedResult) {
      return;
    }
    console.log(
      'Formatted result:\n' + JSON.stringify(formattedResult, null, 4),
    );
    switch (formattedResult.documentFormat) {
      case 'AAMVA':
        const aamva = barcodeItem.formattedResult as AAMVADocumentFormat;
        console.log('AAMVA Number of entries: ' + aamva.numberOfEntries);
        break;
      case 'BOARDING_PASS':
        const boardingPass =
          barcodeItem.formattedResult as BoardingPassDocumentFormat;
        console.log(
          'Boarding Pass Security Data: ' + boardingPass.securityData,
        );
        break;
      case 'DE_MEDICAL_PLAN':
        const deMedicalPlan =
          barcodeItem.formattedResult as MedicalPlanDocumentFormat;
        console.log(
          'Medical Plan Total number of pages: ' +
            deMedicalPlan.totalNumberOfPages,
        );
        break;
      case 'MEDICAL_CERTIFICATE':
        const medicalCertificate =
          barcodeItem.formattedResult as MedicalCertificateDocumentFormat;
        const mcField = medicalCertificate.fields[0];
        if (!mcField) {
          return;
        }
        console.log(
          `Medical Certificate first field: ${mcField.type}: ${mcField.value}`,
        );
        break;
      case 'ID_CARD_PDF_417':
        const idCard =
          barcodeItem.formattedResult as IDCardPDF417DocumentFormat;
        const idCardField = idCard.fields[0];
        if (!idCardField) {
          return;
        }
        console.log(
          `ID Card PDF417 first field: ${idCardField.type}: ${idCardField.value}`,
        );
        break;
      case 'SEPA':
        const sepa = barcodeItem.formattedResult as SEPADocumentFormat;
        const sepaField = sepa.fields[0];
        if (!sepaField) {
          return;
        }
        console.log(`SEPA first field: ${sepaField.type}: ${sepaField.value}`);
        break;
      case 'SWISS_QR':
        const swissQR =
          barcodeItem.formattedResult as SwissQRCodeDocumentFormat;
        const swissQrField = swissQR.fields[0];
        if (!swissQrField) {
          return;
        }
        console.log(
          `SwissQR first field: ${swissQrField.type}: ${swissQrField.value}`,
        );
        break;
      case 'VCARD':
        const vCard = barcodeItem.formattedResult as VCardDocumentFormat;
        const vCardField = vCard.fields[0];
        if (!vCardField) {
          return;
        }
        console.log(
          `vCard first field: ${vCardField.type}: ${vCardField.values.join(
            ',',
          )}`,
        );
        break;
      case 'GS1':
        const gs1 = barcodeItem.formattedResult as GS1DocumentFormat;
        const gs1Field = gs1.fields[0];
        if (!gs1Field) {
          return;
        }
        console.log(
          `GS1 first field: ${gs1Field.fieldDescription}: ${gs1Field.rawValue}`,
        );
        break;
    }
  }

  async importImageAndDetectBarcodes() {
    this.showProgress();
    const uri = (await this.pickImageFromGallery()) as string;
    this.hideProgress();
    if (!uri) {
      return;
    }

    const result = await ScanbotSDK.detectBarcodesOnImage({
      acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
      imageFileUri: uri,
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

  async importImageAndApplyFilter() {
    this.showProgress();
    const uri = (await this.pickImageFromGallery()) as string;
    this.hideProgress();
    if (!uri) {
      return;
    }

    this.onFilterSelected = async (filter: ImageFilter) => {
      this.showProgress();
      const result = await ScanbotSDK.applyImageFilter(uri, filter);
      const filteredImageUri = result.imageFileUri;
      console.log('Created filtered image: ' + filteredImageUri);
      console.log('Creating page for filtered image...');

      const page = await ScanbotSDK.createPage(filteredImageUri);
      const documentPage = await ScanbotSDK.detectDocumentOnPage(page);
      await Pages.add(documentPage);
      this.hideProgress();
      this.pushPage(Screens.IMAGE_RESULTS);
    };

    this.filterActionSheet.show();
  }

  setBarcodeFormats() {
    this.pushPage(Screens.BARCODE_FORMATS);
  }

  setBarcodeDocumentFormats() {
    this.pushPage(Screens.BARCODE_DOCUMENT_FORMATS);
  }

  async startMedicalCertificateRecognizer() {
    let config: MedicalCertificateRecognizerConfiguration = {
      topBarBackgroundColor: Colors.SCANBOT_RED,
      userGuidanceStrings: {
        capturing: 'capturing',
        scanning: 'recognizing',
        processing: 'processing',
        startScanning: 'scanning Started',
        paused: 'paused',
        energySaving: 'energySaving',
      },
      errorDialogMessage: 'error message',
      errorDialogOkButton: 'button text',
      errorDialogTitle: 'error title',
      cancelButtonHidden: false,
      recognizePatientInfo: true,
    };
    const result: MedicalCertificateScannerResult =
      await ScanbotSDK.UI.startMedicalCertificateRecognizer(config);

    if (result.status !== 'OK') {
      return;
    }

    Results.lastMedicalCertificate = result;
    this.pushPage(Screens.MEDICAL_CERTIFICATE_RESULT);

    console.log(JSON.stringify(result, undefined, 4));
  }

  async startGenericDocumentRecognizer() {
    let config: GenericDocumentRecognizerConfiguration = {};
    const result: GenericDocumentRecognizerResult =
      await ScanbotSDK.UI.startGenericDocumentRecognizer(config);

    if (result.status !== 'OK') {
      return;
    }

    Results.lastGenericDocumentResult = result;
    this.pushPage(Screens.GENERIC_DOCUMENT_RESULT);

    console.log(JSON.stringify(result, undefined, 4));
  }

  async startMRZScanner() {
    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint:
        'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
    };

    if (Platform.OS === 'ios') {
      config.finderAspectRatio = {
        width: 0.9,
        height: 0.18,
      };
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
      finderLineColor: '#ff0000',
    };

    const result = await ScanbotSDK.UI.startEHICScanner(config);
    if (result.status === 'OK') {
      const fields = result.fields.map(
        f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
      );
      ViewUtils.showAlert(fields.join('\n'));
    }
  }

  async detectDocumentFromFile() {
    this.showProgress();
    const uri = (await this.pickImageFromGallery()) as string;

    if (!uri) {
      this.hideProgress();
      return;
    }

    var result;
    var blur;
    try {
      result = await ScanbotSDK.detectDocument(uri);
    } catch (err: any) {
      result = 'Error!';
      console.log(err);
    }

    try {
      blur = await ScanbotSDK.estimateBlur({imageFileUri: uri});
    } catch (err: any) {
      blur = 'Error!';
      console.log(err);
    }

    this.hideProgress();
    ViewUtils.showAlert(JSON.stringify({blur, result}));
  }

  private async pickImageFromGallery(): Promise<string | undefined> {
    const pickerResult = await ImageUtils.pickFromGallery();

    if (pickerResult.didCancel || !pickerResult.assets) {
      this.hideProgress();
      return undefined;
    }

    const pickedImage = pickerResult.assets[0];
    const imageUri = pickedImage.uri;

    if (!imageUri) {
      this.hideProgress();
      ViewUtils.showAlert('Error picking image from gallery!');
      return undefined;
    }

    return imageUri;
  }
}
