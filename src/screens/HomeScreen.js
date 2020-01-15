import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import { Container, Content, Text, ListItem, List, Right, Left, Icon } from 'native-base';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-easy-toast'

import ScanbotSDK, { Page, BarcodeScannerConfiguration, MrzScannerConfiguration } from 'react-native-scanbot-sdk';

import {ACTION_ADD_PAGES, ACTION_UPDATE_OR_ADD_PAGE} from '../ScannedPagesStore';

const mapDispatchToProps = (dispatch) => {
  return {
    addScannedPages: (pages: Page[]) => dispatch({ type: ACTION_ADD_PAGES, pages: pages }),
    updateScannedPage: (page: Page) => dispatch({ type: ACTION_UPDATE_OR_ADD_PAGE, page: page })
  };
};

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Scanbot SDK React Native Example',
  };

  constructor() {
    super();
    this.toast = React.createRef();
  }
  render() {
    return (
        <Container>
          <Content style={styles.content}>

            <List>
              <ListItem itemHeader first>
                <Text>DOCUMENT SCANNER</Text>
              </ListItem>
              <ListItem button onPress={this.startDocumentScannerButtonTapped}>
                <Text>Scan Documents</Text>
              </ListItem>
              <ListItem button onPress={this.importImageButtonTapped}>
                <Text>Import image</Text>
              </ListItem>
              <ListItem button onPress={this.viewImageResultsButtonTapped}>
                <Left>
                  <Text>View Image Results</Text>
                </Left>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>

              <ListItem itemHeader>
                <Text>DATA DETECTORS</Text>
              </ListItem>
              <ListItem button onPress={this.startBarcodeScannerButtonTapped}>
                <Text>Scan QR-/Barcode</Text>
              </ListItem>
              <ListItem last button onPress={this.startMrzScannerButtonTapped}>
                <Text>Scan MRZ</Text>
              </ListItem>
            </List>

          </Content>
          <Toast ref={this.toast}/>
        </Container>
    );
  }

  startDocumentScannerButtonTapped = async () => {

    const result = await ScanbotSDK.UI.startDocumentScanner({
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
    });

    if (result.status === 'OK') {
      this.props.addScannedPages(result.pages);
      this.gotoImageResults();
    }
  };

  importImageButtonTapped = async () => {
    const options = {
      title: 'Import image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, async response => {

      if (!ScanbotSDK.isLicenseValid()) {
        this.toast.current.show("License invalid, image not imported");
        return;
      }
      let page = await ScanbotSDK.createPage(response.uri);
      this.props.updateScannedPage(page);
      this.toast.current.show("Image successfully imported, you can now view it by clicking 'View Image Results'");

    });
  };

  viewImageResultsButtonTapped = async () => {
    this.gotoImageResults();
  };

  startBarcodeScannerButtonTapped = async () => {
    const config: BarcodeScannerConfiguration = {
      finderTextHint: 'Please align the barcode or QR code in the frame above to scan it.',
      // barcodeFormats: ['EAN_8', 'EAN_13', 'QR_CODE'],
    };
    const result = await ScanbotSDK.UI.startBarcodeScanner(config);

    if (result.status === 'OK') {
      alert('' + result.format + '\n' + result.value);
    }
  };

  startMrzScannerButtonTapped = async () => {
    let config: MrzScannerConfiguration = {
      // Customize colors, text resources, etc..
      finderTextHint: 'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.'
    };

    if (Platform.OS === 'ios') {
      const {width} = Dimensions.get('window');
      config.finderWidth = width * 0.9;
      config.finderHeight = width * 0.18;
    }

    const result = await ScanbotSDK.UI.startMrzScanner(config);
    if (result.status === 'OK') {
      const fields = result.fields.map(f => `${f.name}: ${f.value} (${f.confidence.toFixed(2)})`);
      alert(fields.join('\n'));
    }
  };

  gotoImageResults = () => {
    this.props.navigation.push('ImageResults');
  };

}

const styles = StyleSheet.create({
  content: {
    margin: 10,
  },
});

export default connect(null, mapDispatchToProps)(HomeScreen);
