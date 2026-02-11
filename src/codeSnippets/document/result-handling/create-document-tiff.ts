import {
  ScanbotBinarizationFilter,
  ScanbotDocument,
  ScanbotTiffGenerator,
  TiffGeneratorParameters,
} from 'react-native-scanbot-sdk';

async function createDocumentTiff() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument(
      'SOME_STORED_DOCUMENT_ID',
    );
    /** Create a TIFF file with the provided options */
    const tiffUriResult = await ScanbotTiffGenerator.generateFromDocument({
      documentUuid: document.uuid,
      tiffGeneratorParameters: new TiffGeneratorParameters({
        binarizationFilter: new ScanbotBinarizationFilter(),
        dpi: 300,
      }),
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
