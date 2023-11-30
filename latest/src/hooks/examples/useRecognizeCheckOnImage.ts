import {useContext} from 'react';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useRecognizeCheckOnImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      setLoading(true);
      const result = await selectImagesFromLibrary();

      if (!result) {
        return;
      }

      const checkResult = await ScanbotSDK.recognizeCheck(result[0]);

      if (checkResult.status !== 'OK') {
        return;
      }

      navigation.navigate(Screens.CHECK_RECOGNIZER_RESULT, checkResult);
      console.log(JSON.stringify(result, undefined, 4));
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
