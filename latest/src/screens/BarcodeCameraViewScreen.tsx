import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ScanbotBarcodeCameraView} from 'react-native-scanbot-sdk';
import {BarcodeFormatsContext} from '../context/useBarcodeFormats';
import {BarcodeDocumentFormatContext} from '../context/useBarcodeDocumentFormats';
import {BarcodeCameraImageButton} from '../components/BarcodeCameraImageButton';
import {COLORS} from '../theme/Theme';

export function BarcodeCameraViewScreen() {
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );
  const [lastDetectedBarcode, setLastDetectedBarcode] = useState('');
  const [finderView, setFinderView] = useState(false);
  const [flashLightEnabled, setFlashLightEnabled] = useState(false);

  return (
    <View style={styles.containerView}>
      <ScanbotBarcodeCameraView
        style={styles.cameraView}
        configuration={{
          finderAspectRatio: {
            width: 1,
            height: 1,
          },
          finderLineWidth: 4,
          finderLineColor: '#ffffff',
          finderBackgroundColor: '#000000',
          finderBackgroundOpacity: 0.4,
          barcodeFormats: acceptedBarcodeFormats,
          acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
          minimumTextLength: 2,
          maximumTextLength: 6,
          shouldUseFinderView: finderView,
          flashEnabled: flashLightEnabled,
        }}
        onBarcodeScannerResult={result => {
          if (result.barcodes.length > 0) {
            const count = result.barcodes.length;
            const optionalText = count > 3 ? `\n(and ${count - 3} more)` : '';
            const text = result.barcodes
              .slice(0, 3)
              .map(barcode => `${barcode.text} (${barcode.type})`)
              .join('\n');
            setLastDetectedBarcode(text + optionalText);
          }
        }}
      />
      <View style={styles.resultsView}>
        <Text style={styles.resultsViewHeader}>Results</Text>
        <Text style={styles.resultsText}>{lastDetectedBarcode}</Text>
        <View style={styles.buttonsContainer}>
          <BarcodeCameraImageButton
            source={require('../assets/ic_finder_view.png')}
            onPress={() => setFinderView(prevState => !prevState)}
          />
          <BarcodeCameraImageButton
            source={
              flashLightEnabled
                ? require('../assets/ic_flash_on.png')
                : require('../assets/ic_flash_off.png')
            }
            onPress={() => setFlashLightEnabled(prevState => !prevState)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    flexDirection: 'column',
  },
  resultsView: {
    flex: 1,
    backgroundColor: COLORS.SCANBOT_RED,
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
  buttonsContainer: {
    borderRadius: 12,
    margin: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
