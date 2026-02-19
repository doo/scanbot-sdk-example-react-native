import {
  ModifyPageOptions,
  ScanbotBinarizationFilter,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

async function applyFiltersAndRotateScannedPage() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument(
      'SOME_STORED_DOCUMENT_ID',
    );
    /** Get the first page of the document */
    const page = document.pages[0];
    /**
     * Apply ScanbotBinarizationFilter to the page
     * Rotate the page clockwise by 90 degrees
     */
    const options = new ModifyPageOptions();
    options.filters = [new ScanbotBinarizationFilter()];
    options.rotation = 'CLOCKWISE_90';

    const documentResultWithModifiedPage = await ScanbotDocument.modifyPage({
      documentUuid: document.uuid,
      pageUuid: page.uuid,
      options: options,
    });
    /** Handle the document */
  } catch (e: any) {
    console.error(e.message);
  }
}
