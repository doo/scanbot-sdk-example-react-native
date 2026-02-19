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

import {
  autorelease,
  ImageRef,
  MrzScannerConfiguration,
  ScanbotMrz,
} from 'react-native-scanbot-sdk';

export function useScanMRZFromImage() {
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
       * Note: ImageRef is used as an input here just to showcase its usage.
       * Passing the image file URI directly to ScanbotMrz.scanFromImage() will work the same way.
       * The autorelease pool is only necessary when working with ImageRef to manage native resources.
       */
      await autorelease(async () => {
        const imageRef = await ImageRef.fromImageFileUri(selectedImage);
        if (!imageRef) {
          return;
        }

        const result = await ScanbotMrz.scanFromImage({
          image: imageRef,
          configuration,
        });

        if (result.document) {
          navigation.navigate(Screens.MRZ_RESULT, {
            mrzDocument: result.document,
            rawMRZ: result.rawMRZ,
          });
        } else {
          infoMessageAlert('No MRZ found.');
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
