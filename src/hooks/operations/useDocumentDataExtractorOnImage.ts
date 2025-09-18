import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK, {
  DocumentDataExtractorConfiguration,
} from 'react-native-scanbot-sdk';

export function useDocumentDataExtractorOnImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

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
       * Extract document data from the selected image and
       * Handle the result by navigating to Screens.DOCUMENT_DATA_EXTRACTOR_RESULT
       */
      const result = await ScanbotSDK.documentDataExtractor({
        imageFileUri: selectedImage,
        configuration: new DocumentDataExtractorConfiguration({}),
      });

      if (result.document) {
        navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
          document: result.document,
          extractionStatus: result.status,
        });
      } else {
        infoMessageAlert('No document detected');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
