import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Retrieve the instance of the crop configuration from the main configuration object. */
    const cropScreenConfiguration = configuration.screens.cropping;
    /** Disable the rotation feature. */
    cropScreenConfiguration.bottomBar.rotateButton.visible = false;
    /** Configure various colors. */
    configuration.appearance.topBarBackgroundColor = '#C8193C';
    cropScreenConfiguration.topBarConfirmButton.foreground.color = '#FFFFFF';
    /** Customize a UI element's text */
    configuration.localization.croppingTopBarCancelButtonTitle = 'Cancel';
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
