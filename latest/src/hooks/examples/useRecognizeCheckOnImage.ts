import {useCallback, useContext} from 'react';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';

export function useRecognizeCheckOnImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
      /**
       * Select an image from the Image Library
       * Return early if no image is selected or there is an issue selecting an image
       **/
      setLoading(true);
      const selectedImage = await selectImagesFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Recognize Check on the selected image and
       * Handle the result by navigating to Screens.CHECK_RECOGNIZER_RESULT
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.recognizeCheck(imageFileUri);
      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
