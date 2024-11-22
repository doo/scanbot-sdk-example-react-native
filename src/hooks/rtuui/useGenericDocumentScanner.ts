import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import ScanbotSDK, {
  GenericDocumentRecognizerConfiguration,
} from 'react-native-scanbot-sdk';

export function useGenericDocumentScanner() {
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
       * Create the generic document scanner configuration object and
       * start the generic document scanner with the configuration
       */
      const config: GenericDocumentRecognizerConfiguration = {
        finderLineColor: '#ff0000',
      };
      const result = await ScanbotSDK.UI.startGenericDocumentRecognizer(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
