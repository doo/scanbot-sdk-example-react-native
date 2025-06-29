import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext, DocumentContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useAddDocumentPage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setDocument} = useContext(DocumentContext);
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(
    async (documentID: string) => {
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
        const selectedImageResult = await selectImageFromLibrary();
        if (!selectedImageResult) {
          return;
        }

        /** Add a page to the document */
        const documentResult = await ScanbotSDK.Document.addPage({
          documentID,
          imageFileUri: selectedImageResult,
          documentDetection: true,
        });
        /**
         * Handle the result by navigating to the result screen
         */
        setDocument(documentResult);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [navigation, setDocument, setLoading],
  );
}
