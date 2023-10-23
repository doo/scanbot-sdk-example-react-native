import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useScanGenericDocument() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.UI.startGenericDocumentRecognizer({});

      if (result.status !== 'OK') {
        return;
      }

      console.log(JSON.stringify(result, undefined, 4));
      navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
