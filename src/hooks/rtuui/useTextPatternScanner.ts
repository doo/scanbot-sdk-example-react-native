import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {useCallback} from 'react';
import {COLORS} from '@theme';

import {
  PatternContentValidator,
  ScanbotTextPattern,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk';

export function useTextPatternScanner() {
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

      // Add a pattern validator to only scan text that passes the validation
      configuration.scannerConfiguration.validator =
        new PatternContentValidator({
          pattern: '^[a-zA-Z]',
          patternGrammar: 'REGEX',
          matchSubstring: true,
        });

      const result = await ScanbotTextPattern.startScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK') {
        resultMessageAlert(
          `${result.data.rawText} : ${(result.data.confidence * 100).toFixed(
            0,
          )}%`,
        );
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
