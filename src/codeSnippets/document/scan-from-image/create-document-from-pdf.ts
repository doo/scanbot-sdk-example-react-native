import {CreateDocumentOptions, ScanbotDocument} from 'react-native-scanbot-sdk';

async function createDocumentFromPDF(pdfUri: string) {
  /**
   * Create a document with an uuid
   * Extract images from the PDF file and add them as document pages
   */
  const document = await ScanbotDocument.createDocumentFromPdf({
    pdfFileUri: pdfUri,
    options: new CreateDocumentOptions({
      documentDetection: true,
    }),
  });
}
