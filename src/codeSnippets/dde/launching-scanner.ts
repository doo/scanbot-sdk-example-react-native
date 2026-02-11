import {
  DocumentDataExtractorScreenConfiguration,
  ScanbotDocumentDataExtractor,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new DocumentDataExtractorScreenConfiguration();
    /** Start the DDE Scanner UI */
    const ddeScannerResult =
      await ScanbotDocumentDataExtractor.startExtractorScreen(configuration);
    /** Handle the result if the status is 'OK' */
    if (ddeScannerResult.status === 'OK') {
      // ddeScannerResult.data.document
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
