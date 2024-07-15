import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import ScanbotSDK, {
  LicensePlateScannerConfiguration,
  LicensePlateScanStrategy,
} from 'react-native-scanbot-sdk';

export function useLicensePlateScanner(scanStrategy: LicensePlateScanStrategy) {
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
       * Create the license scanner configuration object and
       * start the license scanner with the configuration
       */
      let config: LicensePlateScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        scanStrategy: scanStrategy,
      };
      const result = await ScanbotSDK.UI.startLicensePlateScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        resultMessageAlert(
          [
            `- License Plate: ${result.licensePlate}`,
            `- Country code: ${result.countryCode}`,
            result.confidence && `- Confidence: ${result.confidence}%`,
          ].join('\n\n'),
        );
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [scanStrategy]);
}
