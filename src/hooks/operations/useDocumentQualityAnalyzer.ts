import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  selectImageFromLibrary,
} from '@utils';

import ScanbotSDK, {
  DocumentQualityAnalyzerConfiguration,
} from 'react-native-scanbot-sdk';

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
       * Return early if no image is selected, or there is an issue selecting an image
       **/
      setLoading(true);
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }

      // Detect document quality on a selected image
      const result = await ScanbotSDK.documentQualityAnalyzer({
        imageFileUri: selectedImage,
        configuration: new DocumentQualityAnalyzerConfiguration({
          maxImageSize: 2100,
        }),
      });
      /**
       * Handle the result by displaying an alert
       */
      if (result.documentFound) {
        infoMessageAlert(
          `Document Quality for selected image: ${result.quality}`,
        );
      } else {
        errorMessageAlert('Document was not found on selected image');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
