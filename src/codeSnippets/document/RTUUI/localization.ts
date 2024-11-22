import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /**  Retrieve the instance of the localization from the configuration object. */
    const localization = configuration.localization;
    /**  Configure the strings. */
    localization.cameraTopBarTitle = 'Localized cameraTopBarTitle';
    localization.reviewScreenSubmitButtonTitle =
      'Localized reviewScreenSubmitButtonTitle';
    localization.cameraUserGuidanceNoDocumentFound =
      'Localized cameraUserGuidanceNoDocumentFound';
    localization.cameraUserGuidanceTooDark =
      'Localized cameraUserGuidanceTooDark';
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
