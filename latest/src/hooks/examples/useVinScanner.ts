import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {COLORS} from '../../theme/Theme';
import {VinScannerConfiguration} from 'react-native-scanbot-sdk/src/configurations';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

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
        const msg = [
          `- Raw Text: ${result.rawText}`,
          result.confidenceValue &&
            `- Confidence: ${(result.confidenceValue * 100).toFixed(0)}%`,
          `- Validation: ${
            result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'
          }`,
        ].join('\n\n');
        resultMessageAlert(msg);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
