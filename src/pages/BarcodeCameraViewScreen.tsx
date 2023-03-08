import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BaseScreen} from '../utils/BaseScreen';

import {Styles} from '../model/Styles';
import {BarcodeFormats} from '../model/BarcodeFormats';

import {
  ScanbotBarcodeCameraView,
  ScanbotBarcodeCameraViewConfiguration,
  ScanbotBarcodeCameraViewResult,
} from 'react-native-scanbot-sdk';
import {BarcodeDocumentFormats} from '../model/BarcodeDocumentFormats';

var defaultBarcodeCameraViewConfiguration: () => ScanbotBarcodeCameraViewConfiguration =
  () => ({
    shouldUseFinderView: true,
    finderAspectRatio: {
      width: 1,
      height: 1,
    },
    finderMinimumPadding: 64,
    finderVerticalOffset: -64,
    finderLineWidth: 4,
    finderBackgroundOpacity: 0.5,
    barcodeFormats: BarcodeFormats.getAcceptedFormats(),
    acceptedDocumentFormats: BarcodeDocumentFormats.getAcceptedFormats(),
    msiPlesseyChecksumAlgorithm: 'Mod1010',
    engineMode: 'LEGACY',
    gs1DecodingEnabled: true,
    minimumTextLength: 2,
    maximumTextLength: 6,
    flashEnabled: false,
  });

export class BarcodeCameraViewScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  get styles() {
    return StyleSheet.create({
      cameraView: {
        flex: 1,
        flexDirection: 'column',
      } as ViewStyle,

      overlayView: {
        borderRadius: 16,
        margin: 24,
        backgroundColor: 'white',
        opacity: 0.5,
      },

      overlayText: {
        fontSize: 16,
        padding: 16,
      },

      buttonsContainer: {
        borderRadius: 12,
        margin: 24,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      },

      button: {
        backgroundColor: Styles.SCANBOT_RED,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        zIndex: 1,
        marginVertical: 8,
      },

      buttonsText: {
        color: 'white',
      },

      containerView: {
        width: '100%',
        height: '100%',
      },

      resultsView: {
        flex: 1,
        backgroundColor: Styles.SCANBOT_RED,
        shadowRadius: 4,
        shadowOpacity: 0.4,
        alignContent: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        marginBottom: -36,
      },

      resultsViewHeader: {
        margin: 24,
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
      },

      resultsText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        padding: 16,
        alignSelf: 'center',
        textAlign: 'center',
      },
    });
  }

  state = {
    lastDetectedBarcode: '',
    barcodeCameraViewConfiguration: defaultBarcodeCameraViewConfiguration(),
    isOverlayVisible: true,
  };

  toggleFinderView() {
    const {barcodeCameraViewConfiguration} = this.state;
    let config = {...barcodeCameraViewConfiguration};
    config.shouldUseFinderView = !config.shouldUseFinderView;
    this.setState({
      barcodeCameraViewConfiguration: config,
    });
  }

  toggleFlashLight() {
    const {barcodeCameraViewConfiguration} = this.state;
    let config = {...barcodeCameraViewConfiguration};
    config.flashEnabled = !barcodeCameraViewConfiguration.flashEnabled;
    this.setState({barcodeCameraViewConfiguration: config});
  }

  render() {
    const {lastDetectedBarcode} = this.state;
    const {barcodeCameraViewConfiguration} = this.state;

    return (
      <>
        <SafeAreaView>
          <View style={this.styles.containerView}>
            <ScanbotBarcodeCameraView
              style={this.styles.cameraView}
              configuration={barcodeCameraViewConfiguration}
              onBarcodeScannerResult={(
                result: ScanbotBarcodeCameraViewResult,
              ) => {
                if (result.barcodes.length > 0) {
                  const count = result.barcodes.length;
                  const optionalText =
                    count > 4 ? `\n(and ${count - 4} more)` : '';
                  const text = result.barcodes
                    .map(barcode => `${barcode.text} (${barcode.type})`)
                    .join('\n');
                  this.setState({
                    lastDetectedBarcode: text + optionalText,
                  });
                }
              }}
            >
            </ScanbotBarcodeCameraView>
            <View style={this.styles.resultsView}>
              <Text style={this.styles.resultsViewHeader}>Results</Text>
              <Text style={this.styles.resultsText}>{lastDetectedBarcode}</Text>
              <View style={this.styles.buttonsContainer}>
                <TouchableOpacity
                  style={this.styles.button}
                  activeOpacity={0.6}
                  onPress={this.toggleFinderView.bind(this)}>
                  <Image source={require('../assets/ic_finder_view.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={this.styles.button}
                  activeOpacity={0.6}
                  onPress={this.toggleFlashLight.bind(this)}>
                  <Image
                    source={
                      barcodeCameraViewConfiguration.flashEnabled
                        ? require('../assets/ic_flash_on.png')
                        : require('../assets/ic_flash_off.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
