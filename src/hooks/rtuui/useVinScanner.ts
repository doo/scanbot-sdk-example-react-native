import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import ScanbotSDK, {VinScannerConfiguration} from 'react-native-scanbot-sdk';

export function useVinScanner() {
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
       * Create the text data scanner configuration object and
       * start the text data scanner with the configuration
       */
      const config: VinScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };
      const result = await ScanbotSDK.UI.startVinScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        resultMessageAlert(
          [
            `- Raw Text: ${result.rawText}`,
            `- Confidence: ${(result.confidenceValue * 100).toFixed(0)}%`,
            `- Validation: ${
              result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'
            }`,
          ].join('\n\n'),
        );
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
