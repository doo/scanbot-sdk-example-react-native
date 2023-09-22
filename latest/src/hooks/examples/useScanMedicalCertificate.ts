import {useCallback, useContext} from 'react';
import ScanbotSDK, {
  MedicalCertificateRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {LastResultContext} from '../../context/useLastResult';
import {Colors} from '../../model/Colors';
import {errorMessageAlert} from '../../utils/Alerts';

export function useScanMedicalCertificate() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLastMedicalCertificate} = useContext(LastResultContext);

  return useCallback(async () => {
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

      setLastMedicalCertificate(result);
      navigation.navigate(Screens.MEDICAL_CERTIFICATE_RESULT);

      console.log(JSON.stringify(result, undefined, 4));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setLastMedicalCertificate]);
}
