import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
  StyledText,
} from 'react-native-scanbot-sdk/ui_v2';

export function useMRZScanner() {
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
       * Create the machine-readable zone scanner configuration object and
       * start the machine-readable zone scanner with the configuration
       */
      const configuration = new MrzScannerScreenConfiguration();

      // Set colors
      configuration.palette.sbColorPrimary = COLORS.SCANBOT_RED;
      configuration.palette.sbColorOnPrimary = '#ffffff';

      // Add a top guidance title
      configuration.topUserGuidance.title = new StyledText({
        text: 'Scan MRZ',
        color: COLORS.SCANBOT_RED,
        useShadow: true,
      });

      // Modify the action bar
      configuration.actionBar.flipCameraButton.visible = false;
      configuration.actionBar.flashButton.activeForegroundColor =
        COLORS.SCANBOT_RED;

      // Configure the scanner
      configuration.scannerConfiguration.incompleteResultHandling = 'ACCEPT';

      const result = await startMRZScanner(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK') {
        navigation.navigate(Screens.MRZ_RESULT, {
          mrzDocument: result.data.mrzDocument,
          rawMRZ: result.data.rawMRZ,
        });
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
