import ScanbotSDK, {MrzScannerConfiguration} from 'react-native-scanbot-sdk';
import {Platform} from 'react-native';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';

export function useMRZScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      let config: MrzScannerConfiguration = {
        finderTextHint:
          'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
      };

      if (Platform.OS === 'ios') {
        config.finderAspectRatio = {
          width: 0.9,
          height: 0.18,
        };
      }

      const result = await ScanbotSDK.UI.startMrzScanner(config);

      console.log('MRZ Result:\n' + JSON.stringify(result, null, 4));
      if (result.status === 'OK') {
        navigation.navigate(Screens.MRZ_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
