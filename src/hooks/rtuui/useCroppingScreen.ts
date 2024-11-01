import {COLORS} from '@theme';
import {useCallback} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';

import ScanbotSDK, {
  CroppingConfiguration,
  Page,
} from 'react-native-scanbot-sdk';

export function useCroppingScreen() {
  return useCallback(async (page: Page) => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the cropping screen configuration object and
       * start the cropping screen with the configuration
       */
      const config: CroppingConfiguration = {
        doneButtonTitle: 'Apply',
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        bottomBarBackgroundColor: COLORS.SCANBOT_RED,
        orientationLockMode: 'NONE',
        swapTopBottomButtons: false,
      };
      const result = await ScanbotSDK.UI.startCroppingScreen(page, config);
      /**
       * Handle the result
       */
      if (result.status === 'OK') {
        return result.page;
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
