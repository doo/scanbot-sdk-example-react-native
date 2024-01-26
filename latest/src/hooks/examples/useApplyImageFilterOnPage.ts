import {useCallback} from 'react';
import ScanbotSDK, {ImageFilterType, Page} from 'react-native-scanbot-sdk';
import {checkLicense} from '../../utils/SDKUtils';
import {errorMessageAlert} from '../../utils/Alerts';

export function useApplyImageFilterOnPage() {
  return useCallback(async (page: Page, filter: ImageFilterType) => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }

      const updated = await ScanbotSDK.applyImageFilterOnPage(page, filter);
      /**
       * Handle the result
       */
      return updated;
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
