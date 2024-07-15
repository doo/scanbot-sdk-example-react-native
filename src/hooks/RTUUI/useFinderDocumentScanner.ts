// import {useContext} from 'react';
// import ScanbotSDK from 'react-native-scanbot-sdk';
// import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
// import {useNavigation} from '@react-navigation/native';
// import {PageContext} from '../../context/usePages';
// import {COLORS} from '../../theme/Theme';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert} from '../../utils/Alerts';
import {COLORS} from '@theme';
import {PageContext} from '../../context/usePages';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkLicense} from '../../utils/SDKUtils';

export function useFinderDocumentScanner() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {addMultiplePages} = useContext(PageContext);

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the finder document scanner configuration object and
       * start the finder document scanner with the configuration
       */
      const result = await ScanbotSDK.UI.startFinderDocumentScanner({
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        cameraBackgroundColor: COLORS.SCANBOT_RED,
        orientationLockMode: 'PORTRAIT',
        ignoreBadAspectRatio: true,
        finderLineColor: COLORS.SCANBOT_RED,
      });
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        addMultiplePages(result.pages);
        navigation.navigate(Screens.IMAGE_RESULTS);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [addMultiplePages, navigation]);
}
