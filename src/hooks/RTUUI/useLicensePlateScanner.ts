import ScanbotSDK, {
  LicensePlateScannerConfiguration,
  LicensePlateScanStrategy,
} from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {COLORS} from '@theme';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

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
        resultMessageAlert(JSON.stringify(result));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [scanStrategy]);
}
