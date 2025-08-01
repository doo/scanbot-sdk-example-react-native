import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '@theme';
import {useCallback} from 'react';

import ScanbotSDK, {
  autorelease,
  MedicalCertificateScannerConfiguration,
} from 'react-native-scanbot-sdk';

export function useMedicalCertificateScanner() {
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
       * Create the medical certificate scanner configuration object and
       * start the medical certificate scanner with the configuration
       */
      const config: MedicalCertificateScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        userGuidanceStrings: {
          capturing: 'Capturing',
          scanning: 'Recognizing',
          processing: 'Processing',
          startScanning: 'Scanning Started',
          paused: 'Paused',
          energySaving: 'Energy Saving',
        },
        errorDialogMessage: 'Oops, something went wrong! Please, try again.',
        errorDialogOkButton: 'OK',
        errorDialogTitle: 'ERROR',
        cancelButtonHidden: false,
        recognizePatientInfo: true,
      };

      /* An autorelease pool is required because the result object may contain image references. */
      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startMedicalCertificateScanner(
          config,
        );
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          /**
           * The medical certificate is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * When using image references, it's important to manage memory correctly.
           * Ensure image references are released appropriately by using an autorelease pool.
           */
          const medicalCertificateNavigationObject =
            await result.data.serialize();

          navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT, {
            certificate: medicalCertificateNavigationObject,
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
