import {selectImagesFromLibrary} from '@utils';
import ScanbotSDK from 'react-native-scanbot-sdk';

async function createTIFFFromImages() {
  try {
    /**
     * Select images from the Image Library
     * Return early if no images are selected or there is an issue with selecting images
     **/
    const selectedImagesResult = await selectImagesFromLibrary();
    if (!selectedImagesResult) {
      return;
    }
    /** Create a TIFF file with the provided options */
    const tiffCreationResult = await ScanbotSDK.writeTIFF({
      imageFileUris: selectedImagesResult,
      options: {
        dpi: 300,
      },
    });
    /** Handle the result */
  } catch (e: any) {}
}
