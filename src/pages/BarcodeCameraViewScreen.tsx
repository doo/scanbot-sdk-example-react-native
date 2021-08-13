import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BaseScreen} from '../utils/BaseScreen';
import {
  ScanbotBarcodeCameraView,
  ScanbotBarcodeCameraViewConfiguration,
  ScanbotBarcodeCameraViewResult,
} from 'react-native-scanbot-sdk/src/components/scanbot-barcode-camera-view';
import {Styles} from '../model/Styles';
import {BarcodeFormats} from '../model/BarcodeFormats';

const defaultBarcodeCameraViewConfiguration: () => ScanbotBarcodeCameraViewConfiguration =
  () => ({
    shouldUseFinderView: true,
    finderAspectRatio: {
      width: 2,
      height: 1,
    },
    finderLineWidth: 4,
    finderVerticalOffset: 32,
    finderMinimumPadding: 64,
    finderBackgroundOpacity: 0.5,
    barcodeFormats: BarcodeFormats.getAcceptedFormats(),
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
        justifyContent: 'flex-end',
        alignItems: 'center',
      },

      button: {
        backgroundColor: Styles.SCANBOT_RED,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        zIndex: 1,
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
        backgroundColor: '#111111',
        alignContent: 'center',
        justifyContent: 'center',
      },

      resultsText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        padding: 16,
        alignSelf: 'center',
      },
    });
  }

  state = {
    lastDetectedBarcode: '',
    barcodeCameraViewConfiguration: defaultBarcodeCameraViewConfiguration(),
  };

  toggleFinderView() {
    const {lastDetectedBarcode, barcodeCameraViewConfiguration} = this.state;
    let config = {...barcodeCameraViewConfiguration};
    config.shouldUseFinderView = !config.shouldUseFinderView;
    this.setState({
      lastDetectedBarcode: lastDetectedBarcode,
      barcodeCameraViewConfiguration: config,
    });
  }

  render() {
    const {lastDetectedBarcode, barcodeCameraViewConfiguration} = this.state;

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
                if (result.barcode) {
                  const barcode = result.barcode;
                  this.setState({
                    lastDetectedBarcode: `${barcode.barcode} (${barcode.type})`,
                  });
                }
              }}>
              <View style={this.styles.overlayView}>
                <Text style={this.styles.overlayText}>
                  {
                    'This is a native component! Changes are applied in real time. Try that!'
                  }
                </Text>
              </View>
            </ScanbotBarcodeCameraView>
            <View style={this.styles.resultsView}>
              <Text style={this.styles.resultsText}>{lastDetectedBarcode}</Text>
              <View style={this.styles.buttonsContainer}>
                <TouchableOpacity
                  style={this.styles.button}
                  activeOpacity={0.6}
                  onPress={this.toggleFinderView.bind(this)}>
                  <Text style={this.styles.buttonsText}>
                    Toggle Finder View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}
