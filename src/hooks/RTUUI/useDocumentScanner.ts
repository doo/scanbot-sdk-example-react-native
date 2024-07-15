import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '@context';
import {COLORS} from '@theme';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useDocumentScanner() {
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
       * Create the document scanner configuration object and
       * start the document scanner with the configuration
       */
      const result = await ScanbotSDK.UI.startDocumentScanner({
        polygonColor: '#00ffff',
        bottomBarBackgroundColor: COLORS.SCANBOT_RED,
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        cameraBackgroundColor: COLORS.SCANBOT_RED,
        orientationLockMode: 'PORTRAIT',
        pageCounterButtonTitle: '%d Page(s)',
        multiPageEnabled: true,
        ignoreBadAspectRatio: true,
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
