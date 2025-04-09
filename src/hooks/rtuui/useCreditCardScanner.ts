import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {COLORS} from '@theme';

import {
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
  StyledText,
} from 'react-native-scanbot-sdk/ui_v2';

export function useCreditCardScanner() {
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
       * Create the credit card scanner configuration object and
       * start the credit card scanner with the configuration
       */
      const configuration = new CreditCardScannerScreenConfiguration();

      // Set colors
      configuration.palette.sbColorPrimary = COLORS.SCANBOT_RED;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Add a top guidance title
      configuration.topUserGuidance.title = new StyledText({
        text: 'Scan Credit Card',
        color: COLORS.SCANBOT_RED,
        useShadow: true,
      });

      // Modify the action bar
      configuration.actionBar.flipCameraButton.visible = false;
      configuration.actionBar.flashButton.activeForegroundColor =
        COLORS.SCANBOT_RED;

      const result = await startCreditCardScanner(configuration);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK' && result.data) {
        navigation.navigate(Screens.CREDIT_CARD_RESULT, {card: result.data});
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
