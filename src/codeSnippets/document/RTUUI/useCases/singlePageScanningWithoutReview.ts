import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set the page limit. **/
    configuration.outputSettings.pagesScanLimit = 1;
    /** Disable the tutorial screen. **/
    configuration.screens.camera.introduction.showAutomatically = false;
    /** Enable the acknowledgment screen. **/
    configuration.screens.camera.acknowledgement.acknowledgementMode = 'ALWAYS';
    /** Disable the review screen. **/
    configuration.screens.review.enabled = false;
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
