import {selectImageFromLibrary} from '@utils';
import {
  AspectRatio,
  autorelease,
  DocumentStraighteningParameters,
  ScanbotDocumentEnhancer,
} from 'react-native-scanbot-sdk';

async function straighteningDocument() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    /**
     * Note: The result of straightenImage contains an ImageRef, thus
     * the autorelease block must be used to properly dispose of the ImageRef.
     */
    await autorelease(async () => {
      /** Create the default configuration instance */
      const straighteningParameters = new DocumentStraighteningParameters();

      /** Configure the straightening mode as needed **/
      straighteningParameters.straighteningMode = 'STRAIGHTEN';

      /**
       * The straightening parameters can be customized to fit the expected aspect ratio of the document
       * to be straightened. This can help the straightening algorithm to achieve better results.
       */
      straighteningParameters.aspectRatios = [
        new AspectRatio({width: 5, height: 7}),
        new AspectRatio({width: 1, height: 1}),
        new AspectRatio({width: 16, height: 9}),
        new AspectRatio({width: 3, height: 4}),
      ];
      const result = await ScanbotDocumentEnhancer.straightenImage({
        image: selectedImageResult,
        straighteningParameters: straighteningParameters,
      });

      /** Process the result as needed **/
      const encodedImage = await result.straightenedImage?.encodeImage();
    });
  } catch (e: any) {
    console.error(e.message);
  }
}
