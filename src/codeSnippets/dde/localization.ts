import {
  DocumentDataExtractorScreenConfiguration,
  ScanbotDocumentDataExtractor,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new DocumentDataExtractorScreenConfiguration();
    /**  Retrieve the instance of the localization from the configuration object. */
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.topUserGuidance = 'Localized topUserGuidance';
    localization.cameraPermissionCloseButton =
      'Localized cameraPermissionCloseButton';
    localization.completionOverlaySuccessMessage =
      'Localized completionOverlaySuccessMessage';
    localization.introScreenText = 'Localized introScreenText';
    /** Start the DDE Scanner UI */
    const ddeScannerResult =
      await ScanbotDocumentDataExtractor.startExtractorScreen(configuration);
    /** Handle the result if the status is 'OK' */
    if (ddeScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
