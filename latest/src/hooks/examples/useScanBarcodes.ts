import {useCallback, useContext} from 'react';
import ScanbotSDK, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {checkLicense} from '../../utils/SDKUtils';

export function useScanBarcodes() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the barcode scanner configuration object and
       * start the barcode scanner with the configuration
       */
      const config: BarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 1, height: 1},
        useButtonsAllCaps: false,
        barcodeImageGenerationType: 'NONE',
      };
      const result = await ScanbotSDK.UI.startBarcodeScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (
        result.status === 'OK' &&
        result.barcodes &&
        result.barcodes.length > 0
      ) {
        result.barcodes.forEach(barcodeItem => logBarcodeDocument(barcodeItem));
        navigation.navigate(Screens.BARCODE_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
