import {useCallback, useContext} from 'react';
import {errorMessageAlert} from '../../utils/Alerts';
import ScanbotSDK, {
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {checkLicense} from '../../utils/SDKUtils';

export function useBatchBarcodesScanner() {
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
       * Create the batch barcode scanner configuration object and
       * start the batch barcode scanner with the configuration
       */
      const config: BatchBarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 2, height: 1},
        useButtonsAllCaps: false,
      };
      const result = await ScanbotSDK.UI.startBatchBarcodeScanner(config);
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
