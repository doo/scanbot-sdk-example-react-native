import {Platform} from 'react-native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import ScanbotSDK, {
  autorelease,
  MrzScannerConfiguration,
} from 'react-native-scanbot-sdk';

export function useMRZScanner() {
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
       * Create the machine-readable zone scanner configuration object and
       * start the machine-readable zone scanner with the configuration
       */
      const config: MrzScannerConfiguration = {
        finderTextHint:
          'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
      };
      if (Platform.OS === 'ios') {
        config.finderAspectRatio = {
          width: 0.9,
          height: 0.18,
        };
      }

      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startMrzScanner(config);
        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK' && result.data !== undefined) {
          navigation.navigate(Screens.MRZ_RESULT, {
            mrz: result.data.serialize(),
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
