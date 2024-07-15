import ScanbotSDK, {
  MedicalCertificateRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {errorMessageAlert} from '../../utils/Alerts';
import {COLORS} from '@theme';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

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
       * Create the medical certificate recognizer configuration object and
       * start the medical certificate recognizer with the configuration
       */
      let config: MedicalCertificateRecognizerConfiguration = {
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
      const result = await ScanbotSDK.UI.startMedicalCertificateRecognizer(
        config,
      );
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        console.log(JSON.stringify(result, undefined, 4));
        navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
