import {
  startTextPatternScanner,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.topUserGuidance = 'Localized topUserGuidance';
    localization.cameraPermissionCloseButton =
      'Localized cameraPermissionCloseButton';
    localization.completionOverlaySuccessMessage =
      'Localized completionOverlaySuccessMessage';
    localization.finderViewUserGuidance = 'Localized finderViewUserGuidance';
    localization.introScreenTitle = 'Localized introScreenTitle';
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await startTextPatternScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
      // textPatternResult.data.rawText;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
