import {useCallback} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';

import ScanbotSDK, {Page, ParametricFilter} from 'react-native-scanbot-sdk';

export function useApplyImageFiltersOnPage() {
  return useCallback(async (page: Page, filter: ParametricFilter) => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }

      const updated = await ScanbotSDK.applyImageFiltersOnPage(page, [filter]);
      /**
       * Handle the result
       */
      return updated;
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
