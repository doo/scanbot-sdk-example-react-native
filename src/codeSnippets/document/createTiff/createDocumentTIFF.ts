import ScanbotSDK from 'react-native-scanbot-sdk';

async function createDocumentTIFF() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotSDK.Document.loadDocument(
      'SOME_STORED_DOCUMENT_ID',
    );
    /** Create a TIFF file with the provided options */
    const tiffUriResult = await ScanbotSDK.Document.createTIFF({
      documentID: document.uuid,
      options: {
        dpi: 300,
      },
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
