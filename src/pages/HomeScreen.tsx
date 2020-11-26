import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  NativeEventEmitter,
  NativeModules,
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
} from 'react-native-scanbot-sdk';

import {Examples, FeatureId} from '../model/Examples';
import {Styles} from '../model/Styles';
import {ImageUtils} from '../utils/ImageUtils';
import {SDKUtils} from '../utils/SDKUtils';
import {Pages} from '../model/Pages';
import {ViewUtils} from '../utils/ViewUtils';
import {BarcodeFormats} from '../model/BarcodeFormats';
import {Navigation} from '../utils/Navigation';
import {BaseScreen} from '../utils/BaseScreen';
import {Colors} from '../model/Colors';
import {
  BatchBarcodeScannerConfiguration,
  HealthInsuranceCardScannerConfiguration,
  IdCardScannerConfiguration,
} from 'react-native-scanbot-sdk/src';
import {PageStorage} from "../utils/PageStorage";

export class HomeScreen extends BaseScreen {

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

    if (item.id === FeatureId.DocumentScanner) {
      this.startDocumentScanner();
    } else if (item.id === FeatureId.ImportImage) {
      this.importImageAndDetectDocument();
    } else if (item.id === FeatureId.ViewPages) {
      this.viewImageResults();
    } else if (item.id === FeatureId.ScanBarcodes) {
      this.startBarcodeScanner();
    } else if (item.id === FeatureId.ScanBatchBarcodes) {
      this.startBatchBarcodeScanner();
    } else if (item.id === FeatureId.DetectBarcodesOnStillImage) {
      this.importImageAndDetectBarcodes();
    } else if (item.id === FeatureId.BarcodeFormatsFilter) {
      this.setBarcodeFormats();
    } else if (item.id === FeatureId.ScanMRZ) {
      this.startMRZScanner();
    } else if (item.id === FeatureId.ScanEHIC) {
      this.startEHICScanner();
    } else if (item.id === FeatureId.ScanIdCard) {
      this.startIdCardCScanner();
    } else if (item.id === FeatureId.OcrConfigs) {
      const result = await ScanbotSDK.getOCRConfigs();
      ViewUtils.showAlert(JSON.stringify(result));
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
      autoSnappingSensitivity: 0.85,
      // documentImageSizeLimit: { width: 2000, height: 3000 },
      // maxNumberOfPages: 3,
      // See further config properties ...
    };

    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    if (result.status === 'OK') {
      Pages.addList(result.pages);
      this.pushPage(Navigation.IMAGE_RESULTS);
      await PageStorage.INSTANCE.saveAll(result.pages);
    }

    const loaded = await PageStorage.INSTANCE.load();
    console.log("loaded", loaded);
    const refreshed = await ScanbotSDK.refreshImageUris({pages: loaded});
    console.log("refreshed", refreshed);
  }

  async importImageAndDetectDocument() {
    const result = await ImageUtils.pickFromGallery();
    this.showProgress();

    if (result.didCancel) {
      this.hideProgress();
      return;
    }

    let page = await ScanbotSDK.createPage(result.uri);
    page = await ScanbotSDK.detectDocumentOnPage(page);
    Pages.add(page);
    this.hideProgress();

    const blur = await ScanbotSDK.estimateBlur({ imageFileUri: page.documentImageFileUri! });
    console.log("Blur:", blur);
    this.pushPage(Navigation.IMAGE_RESULTS);
  }

  viewImageResults() {
    this.pushPage('Image Results');
  }

  async startBarcodeScanner() {
    const config: BarcodeScannerConfiguration = {
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 1, height: 1},
      useButtonsAllCaps: false,
    };
    const result = await ScanbotSDK.UI.startBarcodeScanner(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  async startBatchBarcodeScanner() {
    const config: BatchBarcodeScannerConfiguration = {
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      finderAspectRatio: {width: 2, height: 1},
      useButtonsAllCaps: false,
    };
    const result = await ScanbotSDK.UI.startBatchBarcodeScanner(config);
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  async importImageAndDetectBarcodes() {
    this.showProgress();
    const image = await ImageUtils.pickFromGallery();

    if (image.didCancel) {
      this.hideProgress();
      return;
    }

    const result = await ScanbotSDK.detectBarcodesOnImage({
      imageFileUri: image.uri,
      barcodeFormats: BarcodeFormats.getAcceptedFormats(),
    });
    this.hideProgress();
    if (result.status === 'OK') {
      ViewUtils.showAlert(JSON.stringify(result.barcodes));
    }
  }

  setBarcodeFormats() {
    this.pushPage(Navigation.BARCODE_FORMATS);
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
        (f) => `${f.name}: ${f.value} (${f.confidence.toFixed(2)})`,
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
        (f) => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
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
}
