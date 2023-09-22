import {useCallback, useContext} from 'react';
import ScanbotSDK, {
  CheckRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {Colors} from '../../model/Colors';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {LastResultContext} from '../../context/useLastResult';

export function useCheckRecognizer() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLastCheckRecognizerResult} = useContext(LastResultContext);

  return useCallback(async () => {
    try {
      const config: CheckRecognizerConfiguration = {
        topBarBackgroundColor: Colors.SCANBOT_RED,
      };

      const result = await ScanbotSDK.UI.startCheckRecognizer(config);

      if (result.status !== 'OK') {
        return;
      }

      setLastCheckRecognizerResult(result);
      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT);

      console.log(JSON.stringify(result, undefined, 4));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation, setLastCheckRecognizerResult]);
}
