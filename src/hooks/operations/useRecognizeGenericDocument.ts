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

export function useRecognizeGenericDocument() {
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
       * Recognize Generic Document on the selected image and
       * Handle the result by navigating to Screens.GENERIC_DOCUMENT_RESULT
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.recognizeGenericDocument({
        imageFileUri,
        acceptedDocumentFormats: [],
      });

      navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT, {
        documents: [result.document],
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
