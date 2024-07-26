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

export function useRecognizeEHIC() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

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
      /**
       * Handle the result by navigating to result screen
       */
      navigation.navigate(Screens.PLAIN_DATA_RESULT, {
        data: result.fields.map(field => ({
          key: field.type,
          value: `${field.value} (${field.confidence.toFixed(2)})`,
        })),
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
