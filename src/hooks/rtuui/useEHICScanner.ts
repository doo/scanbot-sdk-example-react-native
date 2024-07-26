import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback} from 'react';

import ScanbotSDK, {
  HealthInsuranceCardScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {useNavigation} from '@react-navigation/native';

export function useEHICScanner() {
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
       * Create the health insurance card scanner configuration object and
       * start the health insurance card scanner with the configuration
       */
      const config: HealthInsuranceCardScannerConfiguration = {
        finderLineColor: '#ff0000',
      };
      const result = await ScanbotSDK.UI.startEHICScanner(config);
      /**
       * Handle the result by navigating to result screen
       */
      navigation.navigate(Screens.PLAIN_DATA_RESULT, {
        data: result.fields.map(field => ({
          key: field.type,
          value: `${field.value} (${field.confidence.toFixed(2)})`,
        })),
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
