import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@theme';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback} from 'react';

import ScanbotSDK, {
  autorelease,
  CheckScannerScreenConfiguration,
} from 'react-native-scanbot-sdk';

export function useCheckScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

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
       * Create the check configuration object and
       * start the check scanner with the configuration
       */
      const config: CheckScannerScreenConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };

      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startCheckScanner(config);
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          const checkScannerNavigationObject = await result.data.serialize();

          navigation.navigate(Screens.CHECK_SCANNER_RESULT, {
            check: checkScannerNavigationObject,
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
