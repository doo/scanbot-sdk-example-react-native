import {selectImageFromLibrary} from '@utils';
import ScanbotSDK, {
  DocumentQualityAnalyzerConfiguration,
} from 'react-native-scanbot-sdk';

async function documentQualityAnalyzer() {
  try {
    /**
     * Select an image from the Image Library
     * Return early if no image is selected or there is an issue with selecting an image
     **/
    const selectedImageResult = await selectImageFromLibrary();
    if (!selectedImageResult) {
      return;
    }

    /** Detect the quality of the document on image **/
    const quality = await ScanbotSDK.documentQualityAnalyzer({
      imageFileUri: selectedImageResult,
      configuration: new DocumentQualityAnalyzerConfiguration(),
    });
  } catch (e: any) {
    console.error(e.message);
  }
}
