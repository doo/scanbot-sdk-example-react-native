import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK, {MrzScannerConfiguration} from 'react-native-scanbot-sdk';

export function useRecognizeMRZ() {
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

      const configuration = new MrzScannerConfiguration();
      configuration.incompleteResultHandling = 'REJECT';
      // Configure other parameters as needed.

      /**
       * Recognize MRZ on the selected image and
       * Handle the result by navigating to Screens.MRZ_RESULT
       */
      const result = await ScanbotSDK.recognizeMrz({
        imageFileUri: selectedImage,
        configuration: configuration,
      });

      if (result.document) {
        navigation.navigate(Screens.MRZ_RESULT, {
          mrzDocument: result.document,
          rawMRZ: result.rawMRZ,
        });
      } else {
        infoMessageAlert('No MRZ found.');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
