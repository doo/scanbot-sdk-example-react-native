import {useCallback, useContext} from 'react';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import ScanbotSDK, {
  BatchBarcodeScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {logBarcodeDocument} from '../../utils/BarcodeUtils';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';

export function useScanBatchBarcodes() {
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useCallback(async () => {
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

      resultMessageAlert(JSON.stringify(result.barcodes));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats]);
}
