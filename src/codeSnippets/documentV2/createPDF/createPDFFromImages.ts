import {selectImagesFromLibrary} from '@utils';
import ScanbotSDK from 'react-native-scanbot-sdk';

async function createPDFFromImages() {
  try {
    /**
     * Select images from the Image Library
     * Return early if no images are selected or there is an issue with selecting images
     **/
    const selectedImagesResult = await selectImagesFromLibrary();
    if (!selectedImagesResult) {
      return;
    }
    /** Create a PDF file with the provided options */
    const pdfCreationResult = await ScanbotSDK.createPDF({
      imageFileUris: selectedImagesResult,
      options: {
        pageSize: 'A4',
        pageDirection: 'PORTRAIT',
        ocrConfiguration: {
          engineMode: 'SCANBOT_OCR',
        },
      },
    });
    /** Handle the result if the status is 'OK' */
    if (pdfCreationResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
