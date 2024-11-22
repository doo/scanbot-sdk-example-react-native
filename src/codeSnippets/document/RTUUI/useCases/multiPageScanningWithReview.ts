import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set the page limit to 0, to disable the limit, or set it to the number of pages you want to scan. */
    configuration.outputSettings.pagesScanLimit = 0;
    /** Disable the acknowledgment screen. */
    configuration.screens.camera.acknowledgement.acknowledgementMode = 'NONE';
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
