import {selectImageFromLibrary} from '@utils';
import {
  ScanbotBinarizationFilter,
  ScanbotImageProcessor,
} from 'react-native-scanbot-sdk';

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
    const imageWithFilters =
      await ScanbotImageProcessor.applyFiltersOnImageFile({
        imageFileUri: selectedImageResult,
        filters: [new ScanbotBinarizationFilter()],
      });

    /** Rotate the page counterclockwise by 90 degrees */
    const rotatedImage = await ScanbotImageProcessor.rotateImageFile({
      imageFileUri: imageWithFilters,
      rotation: 'CLOCKWISE_90',
    });

    return rotatedImage;
  } catch (e: any) {
    console.error(e.message);
  }
}
