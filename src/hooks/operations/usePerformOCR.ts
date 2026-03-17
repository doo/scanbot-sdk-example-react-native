import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import {
  autorelease,
  ImageRef,
  ScanbotOcrEngine,
} from 'react-native-scanbot-sdk';

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
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }

      /**
       * Note: ImageRef is used as an input here just to showcase its usage.
       * Passing the image file URI directly to ScanbotOcrEngine.recognizeOnImages will work the same way.
       * The autorelease pool is only necessary when working with ImageRef to manage native resources.
       */
      await autorelease(async () => {
        const imageRef = await ImageRef.fromImageFileUri(selectedImage);
        if (!imageRef) {
          return;
        }

        const result = await ScanbotOcrEngine.recognizeOnImages({
          images: [imageRef],
          configuration: {
            engineMode: 'SCANBOT_OCR',
          },
        });

        /**
         * Handle the result by navigating to the result screen
         */
        navigation.navigate(Screens.PLAIN_DATA_RESULT, {
          data: result.recognizedText,
        });
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
