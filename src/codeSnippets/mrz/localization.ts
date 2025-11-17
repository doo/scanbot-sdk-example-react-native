import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
    /**  Retrieve the instance of the localization from the configuration object. */
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.topUserGuidance = 'Localized topUserGuidance';
    localization.cameraPermissionCloseButton =
      'Localized cameraPermissionCloseButton';
    localization.completionOverlaySuccessMessage =
      'Localized completionOverlaySuccessMessage';
    localization.finderViewUserGuidance = 'Localized finderViewUserGuidance';
    /** Start the MRZ Scanner UI */
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
