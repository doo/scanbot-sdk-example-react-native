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
  autorelease,
  CreditCardScannerScreenConfiguration,
  ScanbotCreditCard,
  StyledText,
} from 'react-native-scanbot-sdk';

export function useCreditCardScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(async () => {
    try {
      /**
       * Check the license status and return early
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

      configuration.scannerConfiguration.returnCreditCardImage = true;

      /** An autorelease pool is required because the result object contains image references. */
      await autorelease(async () => {
        const result = await ScanbotCreditCard.startScanner(configuration);
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          /**
           * The credit card result is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * When using image references, it's important to manage memory correctly.
           * Ensure image references are released appropriately by using an autorelease pool.
           * Set the `imageSerializationMode` to `"BUFFER"` to serialize the image data as a base64-encoded string instead of a reference.
           */
          const creditCardScannerNavigationObject =
            await result.data.serialize();

          navigation.navigate(Screens.CREDIT_CARD_RESULT, {
            creditCardDocument: result.data.creditCard,
            recognitionStatus: result.data.recognitionStatus,
            imageRefId:
              creditCardScannerNavigationObject.creditCard?.crop?.uniqueId,
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
