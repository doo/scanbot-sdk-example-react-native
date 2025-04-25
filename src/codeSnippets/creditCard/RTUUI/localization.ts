import {
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
    /**  Retrieve the instance of the localization from the configuration object. */
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.topUserGuidance = 'Localized topUserGuidance';
    localization.cameraPermissionCloseButton =
      'Localized cameraPermissionCloseButton';
    localization.completionOverlaySuccessMessage =
      'Localized completionOverlaySuccessMessage';
    localization.creditCardUserGuidanceNoCardFound =
      'Localized creditCardUserGuidanceNoCardFound';
    /** Start the Credit Card Scanner **/
    const textPatternResult = await startCreditCardScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
