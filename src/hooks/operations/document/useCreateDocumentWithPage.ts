import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {ActivityIndicatorContext, DocumentContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useCreateDocumentWithPage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {setDocument} = useContext(DocumentContext);

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
      /** Create a document object */
      const documentResult = await ScanbotSDK.Document.createDocument({
        imageFileUris: selectedImageResult,
        documentDetection: true,
      });

      /** Add pages */
      setDocument(documentResult);
      navigation.navigate(Screens.DOCUMENT_RESULT);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setDocument, setLoading, navigation]);
}
