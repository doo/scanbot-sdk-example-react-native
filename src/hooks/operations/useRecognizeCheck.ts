import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK, {
  autorelease,
  CheckScannerConfiguration,
  ToJsonConfiguration,
} from 'react-native-scanbot-sdk';

export function useRecognizeCheck() {
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

      /** An autorelease pool is required because the result object contains image references. */
      await autorelease(async () => {
        /**
         * Recognize Check on the selected image and
         * Handle the result by navigating to Screens.CHECK_SCANNER_RESULT
         */
        const result = await ScanbotSDK.recognizeCheck({
          imageFileUri: selectedImage,
          configuration: new CheckScannerConfiguration({
            documentDetectionMode: 'DETECT_AND_CROP_DOCUMENT',
          }),
        });

        /**
         * The check is serialized for use in navigation parameters.
         *
         * By default, images are serialized as references.
         * When using image references, it's important to manage memory correctly.
         * Ensure image references are released appropriately by using an autorelease pool.
         */
        const navigationCheckObject = await result.serialize(
          new ToJsonConfiguration({
            imageSerializationMode: 'BUFFER',
          }),
        );

        navigation.navigate(Screens.CHECK_SCANNER_RESULT, {
          checkDocument: result.check,
          status: result.status,
          buffer: navigationCheckObject.croppedImage?.buffer,
        });
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
