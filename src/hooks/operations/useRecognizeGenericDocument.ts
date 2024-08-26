import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
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
       * Generic Document Recognizer requires OCR blobs.
       * If OCR blobs are not present or there is no 'de' language data, the scanner will fail
       * Return early if there are no installed languages
       */
      const ocrConfigsResult = await ScanbotSDK.getOCRConfigs();
      if (
        ocrConfigsResult.installedLanguages.length === 0 ||
        !ocrConfigsResult.installedLanguages.find(l => l === 'de')
      ) {
        infoMessageAlert(
          'Scanning is not possible since no OCR blobs were found',
        );
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

      if (result.document) {
        navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT, {
          documents: [result.document],
        });
      } else {
        infoMessageAlert('No recognized document found.');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
