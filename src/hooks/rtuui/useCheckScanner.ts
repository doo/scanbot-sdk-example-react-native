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
  ToJsonConfiguration,
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

      /** An autorelease pool is required because the result object contains image references. */
      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startCheckScanner(config);
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          /**
           * The check is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * When using image references, it's important to manage memory correctly.
           * Ensure image references are released appropriately by using an autorelease pool.
           */
          const checkScannerNavigationObject = await result.data.serialize(
            new ToJsonConfiguration({
              imageSerializationMode: 'BUFFER',
            }),
          );

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
