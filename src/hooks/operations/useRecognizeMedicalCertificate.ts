import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useRecognizeMedicalCertificate() {
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
       * Medical Certificate Recognizer requires OCR blobs.
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
       * Recognize Medical Certificate on the selected image and
       * Handle the result by navigating to Screens.MEDICAL_CERTIFICATE_RESULT
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.recognizeMedicalCertificate({
        imageFileUri,
        options: {
          returnCroppedDocumentUri: true,
          patientInfoRecognitionEnabled: true,
          barcodeRecognitionEnabled: true,
        },
      });
      navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
