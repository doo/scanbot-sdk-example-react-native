import React from 'react';
import {
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
  InitializationOptions,
  MrzScannerConfiguration,
} from 'react-native-scanbot-sdk/src';

import {Examples, FeatureId} from '../model/Examples';
import {Styles} from '../model/Styles';
import {ImageUtils} from '../utils/ImageUtils';
import {SDKUtils} from '../utils/SDKUtils';
import {Pages} from '../model/Pages';
import App from '../App';
import {ViewUtils} from '../utils/ViewUtils';
import {BarcodeFormats} from '../model/BarcodeFormats';

export class HomeScreen extends React.Component {
  constructor(props: any) {
    super(props);
    this.registerLicense().then((r) => console.log(r));
  }

  async registerLicense() {
    const options: InitializationOptions = {
      licenseKey: SDKUtils.license,
      loggingEnabled: true,
      storageImageFormat: 'JPG',
      storageImageQuality: 80,
    };

    await ScanbotSDK.initializeSDK(options);
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
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
      </>
    );
  }

  async onListItemClick(item: any) {
    if (item.id === FeatureId.DocumentScanner) {
      if (!(await SDKUtils.checkLicense())) {
        return;
      }
      const config: DocumentScannerConfiguration = {
        // Customize colors, text resources, etc..
        polygonColor: '#00ffff',
        cameraPreviewMode: 'FIT_IN',
        orientationLockMode: 'PORTRAIT',
        pageCounterButtonTitle: '%d Page(s)',
        multiPageEnabled: true,
        ignoreBadAspectRatio: true,
        // documentImageSizeLimit: { width: 1500, height: 2000 },
        // maxNumberOfPages: 3,
        // ...
      };
      const result = await ScanbotSDK.UI.startDocumentScanner(config);
      if (result.status === 'OK') {
        Pages.addList(result.pages);
        this.pushPage(App.IMAGE_RESULTS);
      }
    } else if (item.id === FeatureId.ImportImage) {
      if (!(await SDKUtils.checkLicense())) {
        return;
      }
      const result = await ImageUtils.pickFromGallery();
      let page = await ScanbotSDK.createPage(result.uri);
      page = await ScanbotSDK.detectDocumentOnPage(page);
      Pages.add(page);
      this.pushPage(App.IMAGE_RESULTS);
    } else if (item.id === FeatureId.ViewPages) {
      this.pushPage('Image Results');
    } else if (item.id === FeatureId.ScanBarcodes) {
      if (!(await SDKUtils.checkLicense())) {
        return;
      }
      const config: BarcodeScannerConfiguration = {
        barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      };
      const result = await ScanbotSDK.UI.startBarcodeScanner(config);
      if (result.status === 'OK') {
        ViewUtils.showAlert(JSON.stringify(result.barcodes));
      }
    } else if (item.id === FeatureId.DetectBarcodesOnStillImage) {
      if (!(await SDKUtils.checkLicense())) {
        return;
      }
      const image = await ImageUtils.pickFromGallery();
      const result = await ScanbotSDK.detectBarcodesOnImage({
        imageFileUri: image.uri,
        barcodeFormats: BarcodeFormats.getAcceptedFormats(),
      });
      if (result.status === 'OK') {
        ViewUtils.showAlert(JSON.stringify(result.barcodes));
      }
    } else if (item.id === FeatureId.BarcodeFormatsFilter) {
      this.pushPage(App.BARCODE_FORMATS);
    } else if (item.id === FeatureId.ScanMRZ) {
      if (!(await SDKUtils.checkLicense())) {
        return;
      }

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
    } else if (item.id === FeatureId.LicenseInfo) {
      const valid = await ScanbotSDK.isLicenseValid();
      ViewUtils.showAlert(
        'Scanbot SDK license is ' + (valid ? 'valid' : 'expired'),
      );
    } else if (item.id === FeatureId.LearnMore) {
      await Linking.openURL('https://scanbot.io/sdk');
    }
  }

  private pushPage(name: string) {
    // @ts-ignore
    this.props.navigation.push(name);
  }
}
