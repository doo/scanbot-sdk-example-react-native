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
