import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

export function useOCRConfigs() {
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
       * Get the OCR Configs
       * Handle the result by displaying an Alert
       */
      const result = await ScanbotSDK.getOCRConfigs();
      resultMessageAlert(JSON.stringify(result));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
