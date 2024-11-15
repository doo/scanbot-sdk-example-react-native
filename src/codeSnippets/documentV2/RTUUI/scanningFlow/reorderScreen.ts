import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Retrieve the instance of the reorder pages configuration from the main configuration object. */
    const reorderScreenConfiguration = configuration.screens.reorderPages;
    /** Hide the guidance view. */
    reorderScreenConfiguration.guidance.visible = false;
    /** Set the title for the reorder screen. */
    reorderScreenConfiguration.topBarTitle.text = 'Reorder Pages Screen';
    /** Set the title for the guidance. */
    reorderScreenConfiguration.guidance.title.text = 'Reorder';
    /** Set the color for the page number text. */
    reorderScreenConfiguration.pageTextStyle.color = '#000000';
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
