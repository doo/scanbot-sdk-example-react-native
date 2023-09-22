import {useCallback, useContext} from 'react';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {LastResultContext} from '../../context/useLastResult';

export function useRecognizeCheckOnImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {setLastCheckRecognizerResult} = useContext(LastResultContext);

  return useCallback(async () => {
    try {
      setLoading(true);
      const result = await selectImagesFromLibrary();

      if (!result) {
        return;
      }

      const checkResult = await ScanbotSDK.recognizeCheck(result[0]);

      setLastCheckRecognizerResult(checkResult);
      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLastCheckRecognizerResult, setLoading]);
}
