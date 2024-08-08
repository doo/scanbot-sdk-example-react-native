import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useRecognizeCheck() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
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
       * Recognize Check on the selected image and
       * Handle the result by navigating to Screens.CHECK_RECOGNIZER_RESULT
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.recognizeCheck({imageFileUri});
      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
