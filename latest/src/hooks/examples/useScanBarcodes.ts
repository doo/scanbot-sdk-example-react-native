import {useContext} from 'react';
import ScanbotSDK, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useScanBarcodes() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: BarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 1, height: 1},
        useButtonsAllCaps: false,
        barcodeImageGenerationType: 'NONE',
      };

      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeBarcodeScanner();
      });

      const result = await ScanbotSDK.UI.startBarcodeScanner(config);
      if (result.status !== 'OK' || !result.barcodes) {
        return;
      }

      const barcodeItem = result.barcodes[0];
      if (barcodeItem) {
        logBarcodeDocument(barcodeItem);
      }

      navigation.navigate(Screens.BARCODE_RESULT, result);

      //resultMessageAlert(JSON.stringify(result.barcodes));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
