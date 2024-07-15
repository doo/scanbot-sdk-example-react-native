import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import ScanbotSDK, {
  TextDataScannerConfiguration,
} from 'react-native-scanbot-sdk';

export function useTextDataScanner() {
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
      const config: TextDataScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        textDataScannerStep: {
          allowedSymbols: '',
          aspectRatio: {
            height: 1.0,
            width: 5.0,
          },
          guidanceText: 'Place the LC display in the frame to scan it',
          pattern: '',
          preferredZoom: 2.0,
          shouldMatchSubstring: false,
          significantShakeDelay: -1,
          unzoomedFinderHeight: 40,
        },
      };
      const result = await ScanbotSDK.UI.startTextDataScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.result?.text) {
        resultMessageAlert(
          `${result.result?.text} : ${result.result.confidence}%`,
        );
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
