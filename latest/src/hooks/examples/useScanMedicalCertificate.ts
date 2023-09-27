import ScanbotSDK, {
  MedicalCertificateRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../model/Colors';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useScanMedicalCertificate() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      let config: MedicalCertificateRecognizerConfiguration = {
        topBarBackgroundColor: Colors.SCANBOT_RED,
        userGuidanceStrings: {
          capturing: 'capturing',
          scanning: 'recognizing',
          processing: 'processing',
          startScanning: 'scanning Started',
          paused: 'paused',
          energySaving: 'energySaving',
        },
        errorDialogMessage: 'error message',
        errorDialogOkButton: 'button text',
        errorDialogTitle: 'error title',
        cancelButtonHidden: false,
        recognizePatientInfo: true,
      };
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
