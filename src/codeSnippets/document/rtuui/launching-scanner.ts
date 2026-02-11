import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Start the Document Scanner UI */
    const documentResult = await ScanbotDocument.startScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
