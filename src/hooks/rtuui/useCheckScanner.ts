import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback} from 'react';
import {COLORS} from '@theme';

import {autorelease, ToJsonConfiguration} from 'react-native-scanbot-sdk';
import {
  CheckScannerScreenConfiguration,
  startCheckScanner,
} from 'react-native-scanbot-sdk/ui_v2';

export function useCheckScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

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
       * Create the check configuration object and
       * start the check scanner with the configuration
       */
      const configuration = new CheckScannerScreenConfiguration();

      // Modify behaviors
      configuration.exampleOverlayVisible = true;
      configuration.captureHighResolutionImage = true;
      configuration.scanningProgress.progressColor = COLORS.SCANBOT_RED;

      // Set colors
      configuration.palette.sbColorPrimary = COLORS.SCANBOT_RED;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      /** An autorelease pool is required because the result object contains image references. */
      await autorelease(async () => {
        const result = await startCheckScanner(configuration);
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          /**
           * The check is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * When using image references, it's important to manage memory correctly.
           * Ensure image references are released appropriately by using an autorelease pool.
           * Set the `imageSerializationMode` to `"BUFFER"` to serialize the image data as a base64-encoded string instead of a reference.
           */
          const checkScannerNavigationObject = await result.data.serialize(
            new ToJsonConfiguration({
              imageSerializationMode: 'BUFFER',
            }),
          );

          navigation.navigate(Screens.CHECK_SCANNER_RESULT, {
            checkDocument: result.data.check,
            status: result.data.recognitionStatus,
            buffer: checkScannerNavigationObject.croppedImage?.buffer,
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
