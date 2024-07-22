import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  resultMessageAlert,
  selectImagesFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useRecognizeEHIC() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
      setLoading(true);
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
      const selectedImage = await selectImagesFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Recognize health insurance card on the selected image and
       * Handle the result by displaying an alert
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.recognizeEHIC(imageFileUri);
      const fields = result.fields.map(
        f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
      );
      resultMessageAlert(fields.join('\n'));
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
