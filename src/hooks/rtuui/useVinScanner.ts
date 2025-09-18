import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {useCallback} from 'react';

import {
  startVINScanner,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

export function useVinScanner() {
  return useCallback(async () => {
    try {
      /**
       * Check the license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the VIN scanner configuration object and
       * start the VIN scanner with the configuration
       */
      const configuration = new VinScannerScreenConfiguration();
      configuration.confirmationAlertDialogEnabled = false;

      const result = await startVINScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK') {
        if (result.data.barcodeResult.extractedVIN) {
          resultMessageAlert(
            `Extracted Barcode VIN: ${result.data.barcodeResult.extractedVIN}`,
          );
        } else {
          resultMessageAlert(
            [
              `- Raw Text: ${result.data.textResult.rawText}`,
              `- Confidence: ${(
                result.data.textResult.confidence * 100
              ).toFixed(0)}%`,
              `- Validation: ${
                result.data.textResult.validationSuccessful
                  ? 'SUCCESSFUL'
                  : 'NOT SUCCESSFUL'
              }`,
            ].join('\n\n'),
          );
        }
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
