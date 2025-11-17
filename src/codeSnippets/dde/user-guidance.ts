import {
  DocumentDataExtractorScreenConfiguration,
  startDocumentDataExtractor,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new DocumentDataExtractorScreenConfiguration();
    /** Retrieve the instance of the top user guidance from the configuration object. */
    const topUserGuidance = configuration.topUserGuidance;
    /** Show the top user guidance */
    topUserGuidance.visible = true;
    /** Customize the top user guidance */
    topUserGuidance.title.text = 'Customized title';
    topUserGuidance.title.color = '#000000';
    /** Customize the top user guidance background */
    topUserGuidance.background.fillColor = '#C8193C';
    /** Retrieve the instance of the scan status user guidance from the configuration object. */
    const scanStatusUserGuidance = configuration.scanStatusUserGuidance;
    /** Customize the scan status user guidance */
    scanStatusUserGuidance.title.text = 'Customized title';
    scanStatusUserGuidance.title.color = '#000000';
    /** Customize the scan status guidance background */
    scanStatusUserGuidance.background.fillColor = '#C8193C';
    /** Start the DDE Scanner UI */
    const ddeScannerResult = await startDocumentDataExtractor(configuration);
    /** Handle the result if the status is 'OK' */
    if (ddeScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
