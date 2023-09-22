import {useCallback, useContext} from 'react';
import ScanbotSDK, {
  BarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';

export function useScanBarcodes() {
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useCallback(async () => {
    try {
      const config: BarcodeScannerConfiguration = {
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        finderAspectRatio: {width: 1, height: 1},
        useButtonsAllCaps: false,
        barcodeImageGenerationType: 'NONE',
      };

      const result = await ScanbotSDK.UI.startBarcodeScanner(config);
      if (result.status !== 'OK' || !result.barcodes) {
        return;
      }

      const barcodeItem = result.barcodes[0];
      if (barcodeItem) {
        logBarcodeDocument(barcodeItem);
      }

      resultMessageAlert(JSON.stringify(result.barcodes));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats]);
}
