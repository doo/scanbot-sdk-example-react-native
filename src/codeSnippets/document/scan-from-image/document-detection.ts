import ScanbotSDK, {
  DocumentScannerConfiguration,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';
import {selectImageFromLibrary} from '@utils';

async function detectDocumentDetection() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }
    /** Detect the document */
    const documentDetectionResult = await ScanbotDocument.scanFromImage({
      image: selectedImageResult,
      configuration: new DocumentScannerConfiguration(),
    });
    /** Handle the result */
  } catch (e: any) {
    console.error(e.message);
  }
}
