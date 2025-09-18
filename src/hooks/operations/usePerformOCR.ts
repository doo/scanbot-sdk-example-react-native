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

export function usePerformOCR() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(async () => {
    try {
      setLoading(true);
      /**
       * Check the license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Select an image from the Image Library
       * Return early if no image is selected, or there is an issue selecting an image
       **/
      const selectedImages = await selectImagesFromLibrary();
      if (!selectedImages) {
        return;
      }
      /**
       * Perform optical character recognition with the provided configuration and
       * Display the result
       */
      const result = await ScanbotSDK.performOCR({
        imageFileUris: selectedImages,
        ocrConfiguration: {
          engineMode: 'SCANBOT_OCR',
        },
      });
      /**
       * Handle the result by navigating to the result screen
       */
      navigation.navigate(Screens.PLAIN_DATA_RESULT, {
        data: result.plainText,
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
