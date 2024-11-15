import {selectPDFFileUri} from '@utils';
import ScanbotSDK from 'react-native-scanbot-sdk';

async function extractImagesFromPDF() {
  try {
    /**
     * Select a PDF file
     * Return early if no file is selected or there is an issue with selecting a file
     **/
    const fileUrl = await selectPDFFileUri();
    if (!fileUrl) {
      return;
    }
    /**
     * Extract the images from the PDF with the desired configuration options
     * Check if the resulting Page Array is returned
     */
    const imagesResult = await ScanbotSDK.extractImagesFromPdf({
      pdfFilePath: fileUrl,
    });
    /** Handle the  result if the status is 'OK' */
    if (imagesResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
