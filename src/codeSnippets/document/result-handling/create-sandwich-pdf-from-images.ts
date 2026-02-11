import {selectImagesFromLibrary} from '@utils';
import {PdfConfiguration, ScanbotPdfGenerator} from 'react-native-scanbot-sdk';

async function createSearchablePDFFromImages() {
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
    const pdfCreationResult = await ScanbotPdfGenerator.generateFromImages({
      images: selectedImagesResult,
      pdfConfiguration: new PdfConfiguration({
        pageSize: 'A4',
        pageDirection: 'PORTRAIT',
      }),
      ocrConfiguration: {
        engineMode: 'SCANBOT_OCR',
      },
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
