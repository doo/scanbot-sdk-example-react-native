import ScanbotSDK, {
  CheckRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';

export function useCheckRecognizer() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: CheckRecognizerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };

      const result = await ScanbotSDK.UI.startCheckRecognizer(config);

      if (result.status !== 'OK' || result.checkStatus !== 'SUCCESS') {
        return;
      }

      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, result);
      console.log(JSON.stringify(result, undefined, 4));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
