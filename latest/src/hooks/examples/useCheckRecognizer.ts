import ScanbotSDK, {
  CheckRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useCheckRecognizer() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: CheckRecognizerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };

      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeCheckRecognizer();
      });

      const result = await ScanbotSDK.UI.startCheckRecognizer(config);

      console.log(JSON.stringify(result, undefined, 4));

      if (result.status !== 'OK') {
        return;
      }

      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
