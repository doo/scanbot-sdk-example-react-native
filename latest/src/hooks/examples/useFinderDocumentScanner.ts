// import {useContext} from 'react';
// import ScanbotSDK from 'react-native-scanbot-sdk';
// import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
// import {useNavigation} from '@react-navigation/native';
// import {PageContext} from '../../context/usePages';
// import {COLORS} from '../../theme/Theme';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useFinderDocumentScanner() {
  // const navigation = useNavigation<PrimaryRouteNavigationProp>();
  // const {addMultiplePages} = useContext(PageContext);

  return useLicenseValidityCheckWrapper(async () => {
    errorMessageAlert('Not implemented');
    // try {
    //   const result = await ScanbotSDK.UI.startFinderDocumentScanner({
    //     topBarBackgroundColor: COLORS.SCANBOT_RED,
    //     cameraBackgroundColor: COLORS.SCANBOT_RED,
    //     orientationLockMode: 'PORTRAIT',
    //     ignoreBadAspectRatio: true,
    //     finderLineColor: COLORS.SCANBOT_RED,
    //   });
    //   if (result.status === 'OK') {
    //     addMultiplePages(result.pages);
    //     navigation.navigate(Screens.IMAGE_RESULTS);
    //   }
    // } catch (e: any) {
    //   errorMessageAlert(e.message);
    // }
  });
}
