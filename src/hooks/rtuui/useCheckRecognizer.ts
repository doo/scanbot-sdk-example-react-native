import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import ScanbotSDK, {
  CheckRecognizerConfiguration,
} from 'react-native-scanbot-sdk';

export function useCheckRecognizer() {
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
      const config: CheckRecognizerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };
      const result = await ScanbotSDK.UI.startCheckRecognizer(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
