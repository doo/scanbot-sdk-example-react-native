import {useContext} from 'react';
import {errorMessageAlert} from '../../utils/Alerts';
import ScanbotSDK, {
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';

export function useScanBatchBarcodes() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: BatchBarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 2, height: 1},
        useButtonsAllCaps: false,
      };

      const result = await ScanbotSDK.UI.startBatchBarcodeScanner(config);
      if (result.status !== 'OK' || !result.barcodes) {
        return;
      }

      const barcodeItem = result.barcodes[0];
      if (barcodeItem) {
        logBarcodeDocument(barcodeItem);
      }

      navigation.navigate(Screens.BARCODE_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
