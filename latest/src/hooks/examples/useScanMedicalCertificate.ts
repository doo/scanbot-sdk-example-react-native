import ScanbotSDK, {
  MedicalCertificateRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useScanMedicalCertificate() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
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
      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeMedicalCertificateRecognizer();
      });
      const result = await ScanbotSDK.UI.startMedicalCertificateRecognizer(
        config,
      );

      if (result.status !== 'OK') {
        return;
      }

      console.log(JSON.stringify(result, undefined, 4));
      navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
