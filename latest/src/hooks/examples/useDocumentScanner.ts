import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../context/usePages';
import {COLORS} from '../../theme/Theme';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useDocumentScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {addMultiplePages} = useContext(PageContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.UI.startDocumentScanner({
        polygonColor: '#00ffff',
        bottomBarBackgroundColor: COLORS.SCANBOT_RED,
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        cameraBackgroundColor: COLORS.SCANBOT_RED,
        orientationLockMode: 'PORTRAIT',
        pageCounterButtonTitle: '%d Page(s)',
        multiPageEnabled: false,
        ignoreBadAspectRatio: true,
      });
      if (result.status === 'OK') {
        addMultiplePages(result.pages);
        navigation.navigate(Screens.IMAGE_RESULTS);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
