import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  selectImageFromLibrary,
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
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }

      // Detect document quality on selected image
      const quality = await ScanbotSDK.documentQualityAnalyzer({
        imageFileUri: selectedImage,
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
