import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {useCallback} from 'react';
import {COLORS} from '@theme';

import {
  startTextPatternScanner,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

export function useTextPatternScanner() {
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
       * Create the text pattern scanner configuration object and
       * start the text pattern scanner with the configuration
       */
      const configuration = new TextPatternScannerScreenConfiguration();

      // Set colors
      configuration.palette.sbColorPrimary = COLORS.SCANBOT_RED;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Modify the action bar
      configuration.actionBar.flipCameraButton.visible = false;
      configuration.actionBar.flashButton.activeForegroundColor =
        COLORS.SCANBOT_RED;

      configuration.scannerConfiguration.minimumNumberOfRequiredFramesWithEqualScanningResult = 4;

      const result = await startTextPatternScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK') {
        resultMessageAlert(
          `${result.data.rawText} : ${result.data.confidence}%`,
        );
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
