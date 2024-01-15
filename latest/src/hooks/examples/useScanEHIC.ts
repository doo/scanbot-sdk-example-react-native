import ScanbotSDK, {
  HealthInsuranceCardScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

export function useScanEHIC() {
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
       * Create the health insurance card scanner configuration object and
       * start the health insurance card scanner with the configuration
       */
      const config: HealthInsuranceCardScannerConfiguration = {
        finderLineColor: '#ff0000',
      };
      const result = await ScanbotSDK.UI.startEHICScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        const fields = result.fields.map(
          f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
        );
        resultMessageAlert(fields.join('\n'));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
