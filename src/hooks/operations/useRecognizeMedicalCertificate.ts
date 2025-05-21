import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK, {
  autorelease,
  MedicalCertificateScanningParameters,
} from 'react-native-scanbot-sdk';

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
       * Medical Certificate Scanner requires OCR blobs.
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
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }

      /* An autorelease pool is required because the result object may contain image references. */
      await autorelease(async () => {
        /**
         * Recognize Medical Certificate on the selected image and
         * Handle the result by navigating to Screens.MEDICAL_CERTIFICATE_RESULT
         */
        const result = await ScanbotSDK.recognizeMedicalCertificate({
          imageFileUri: selectedImage,
          configuration: new MedicalCertificateScanningParameters({
            extractCroppedImage: true,
          }),
        });

        if (result.scanningSuccessful) {
          /**
           * The medical certificate is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * When using image references, it's important to manage memory correctly.
           * Ensure image references are released appropriately by using an autorelease pool.
           */
          const medicalCertificateNavigationObject = await result.serialize();

          navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT, {
            certificate: medicalCertificateNavigationObject,
          });
        } else {
          infoMessageAlert('No medical certificate detected');
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
