import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useDetectDocument() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

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
      /**
       * Handle the result by navigating to result screen
       */
      navigation.navigate(Screens.PLAIN_DATA_RESULT, {
        imageUris: [result.documentImageFileUri],
        data:
          `Detection Result : ${result.detectionResult} \n` +
          `Polygon : ${JSON.stringify(result.polygon, null, 2)} \n`,
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
