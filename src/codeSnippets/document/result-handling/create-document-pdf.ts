import {
  PdfConfiguration,
  ScanbotDocument,
  ScanbotPdfGenerator,
} from 'react-native-scanbot-sdk';

async function createDocumentPdf() {
  try {
    /** Load a document from storage or create a new one */
    const document = await ScanbotDocument.loadDocument(
      'SOME_STORED_DOCUMENT_ID',
    );
    /** Create a PDF file with the provided options */
    const pdfUriResult = await ScanbotPdfGenerator.generateFromDocument({
      documentUuid: document.uuid,
      pdfConfiguration: new PdfConfiguration(),
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
