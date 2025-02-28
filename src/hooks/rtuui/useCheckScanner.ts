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
  CheckScannerConfiguration,
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
       * start the check recognizer with the configuration
       */
      const config: CheckScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };
      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startCheckScanner(config);
        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK' && result.data) {
          navigation.navigate(Screens.CHECK_SCANNER_RESULT, {
            check: result.data.serialize(),
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
