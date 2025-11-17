import ScanbotSDK from 'react-native-scanbot-sdk';

async function extractImagesFromPDF(pdfUri: string) {
  /**
   * Extract the images from the PDF with the desired configuration options
   * Check if the resulting Page Array is returned
   */
  const imagesResult = await ScanbotSDK.extractImagesFromPdf({
    pdfFilePath: pdfUri,
  });
}
