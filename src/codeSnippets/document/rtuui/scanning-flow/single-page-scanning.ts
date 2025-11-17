import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function useSinglePageScanning() {
  try {
    /** Create the configuration object for single page scanning */
    const configuration = new DocumentScanningFlow();
    configuration.outputSettings.pagesScanLimit = 1;

    /** See further customization configs... */

    const documentResult = await startDocumentScanner(configuration);
    
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}