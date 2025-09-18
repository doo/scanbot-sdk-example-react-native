import {checkLicense, errorMessageAlert, resultMessageAlert} from '@utils';
import {useCallback} from 'react';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useOCRConfigs() {
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
       * Get the OCR Configs
       * Handle the result by displaying an Alert
       */
      const result = await ScanbotSDK.getOCRConfigs();
      resultMessageAlert(
        `Installed languages: ${result.installedLanguages} at path ${result.languageDataPath}`,
      );
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
