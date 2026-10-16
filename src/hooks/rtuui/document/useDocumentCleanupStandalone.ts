import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {DocumentContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {
  DocumentCleanupStandaloneConfiguration,
  ScanbotDocument,
  ScanbotDocumentEnhancer,
} from 'react-native-scanbot-sdk';

export function useDocumentCleanupStandalone() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setDocument} = useContext(DocumentContext);

  return useCallback(async () => {
    try {
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
      const selectedImageResult = await selectImageFromLibrary();
      if (!selectedImageResult) {
        return;
      }
      /**
       * Create a document object from the selected image
       */
      const document = await ScanbotDocument.createDocumentFromImages({
        images: [selectedImageResult],
      });
      /*
       * Create a document cleanup configuration object and
       * start the document cleanup screen with the configuration
       */
      const configuration = new DocumentCleanupStandaloneConfiguration({
        documentUuid: document.uuid,
        pageUuid: document.pages[0].uuid,
      });
      /*
       * Configure the cleanup screen
       */
      configuration.cleanup.topBarConfirmButton.text = 'Submit';

      const cleanedUpDocument =
        await ScanbotDocumentEnhancer.startDocumentCleanupScreen(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (cleanedUpDocument.status === 'OK') {
        setDocument(cleanedUpDocument.data);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setDocument]);
}
