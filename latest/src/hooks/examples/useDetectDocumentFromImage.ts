import {useCallback, useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {checkLicense} from '../../utils/SDKUtils';

export function useDetectDocumentFromImage() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Select an image from the Image Library
       * Return early if no image is selected or there is an issue selecting an image
       **/
      setLoading(true);
      const selectedImageResult = await selectImagesFromLibrary();
      if (!selectedImageResult) {
        return;
      }

      const [imageFileUri] = selectedImageResult;
      // Detect document on selected image
      const result = await ScanbotSDK.detectDocument(imageFileUri);
      // Estimate document blur on selected image
      const blur = await ScanbotSDK.estimateBlur({imageFileUri: imageFileUri});
      /**
       * Handle the result by displaying an Alert
       */
      resultMessageAlert(
        JSON.stringify(result) + '\n' + JSON.stringify(blur, null, 2),
      );
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
