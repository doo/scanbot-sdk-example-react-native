import {selectImageFromLibrary} from '@utils';
import ScanbotSDK, {ScanbotBinarizationFilter} from 'react-native-scanbot-sdk';

export async function applyFiltersOnImage() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }
    /** Apply ScanbotBinarizationFilter to the image */
    const imageWithFilters = await ScanbotSDK.applyImageFilters(
      selectedImageResult,
      [new ScanbotBinarizationFilter()],
    );
    /** Rotate the page counterclockwise by 90 degrees */
    const rotatedImage = await ScanbotSDK.rotateImage(
      imageWithFilters.imageFileUri,
      90,
    );

    return rotatedImage.imageFileUri;
  } catch (e: any) {
    console.error(e.message);
  }
}
