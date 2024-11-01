import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';

export function useLegacyBarcodeScanner() {
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
        navigation.navigate(Screens.BARCODE_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
