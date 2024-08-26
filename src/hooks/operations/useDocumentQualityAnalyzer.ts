import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  selectImagesFromLibrary,
} from '@utils';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useDocumentQualityAnalyzer() {
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
      // Detect document quality on selected image
      const quality = await ScanbotSDK.documentQualityAnalyzer({
        imageFileUri: imageFileUri,
      });
      /**
       * Handle the result by displaying an alert
       */
      infoMessageAlert(
        `Document Quality for selected image: ${quality.result}`,
      );
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
