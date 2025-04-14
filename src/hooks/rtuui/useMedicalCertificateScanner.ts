import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
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

      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startMedicalCertificateScanner(
          config,
        );
        /**
         * Handle the result if result status is OK
         */
        if (result.status === 'OK' && result.data !== undefined) {
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
