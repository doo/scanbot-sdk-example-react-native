import {
  startVINScanner,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new VinScannerScreenConfiguration();
    /**  Retrieve the instance of the localization from the configuration object. */
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.topUserGuidance = 'Localized topUserGuidance';
    localization.cameraPermissionCloseButton =
      'Localized cameraPermissionCloseButton';
    localization.completionOverlaySuccessMessage =
      'Localized completionOverlaySuccessMessage';
    localization.introScreenText = 'Localized introScreenText';
    /** Start the VIN Scanner UI */
    const vinScannerResult = await startVINScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (vinScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
