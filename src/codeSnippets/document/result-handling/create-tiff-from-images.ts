import {selectImagesFromLibrary} from '@utils';
import {
  ScanbotBinarizationFilter,
  ScanbotTiffGenerator,
  TiffGeneratorParameters,
} from 'react-native-scanbot-sdk';

async function createTiffFromImages() {
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
    const tiffCreationResult = await ScanbotTiffGenerator.generateFromImages({
      images: selectedImagesResult,
      tiffGeneratorParameters: new TiffGeneratorParameters({
        binarizationFilter: new ScanbotBinarizationFilter(),
        dpi: 300,
      }),
    });
    /** Handle the result */
  } catch (e: any) {}
}
