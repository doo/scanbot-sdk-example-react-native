import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {LastResultContext} from '../../context/useLastResult';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useScanGenericDocument() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLastGenericDocumentResult} = useContext(LastResultContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.UI.startGenericDocumentRecognizer({});

      if (result.status !== 'OK') {
        return;
      }

      setLastGenericDocumentResult(result);
      navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT);

      console.log(JSON.stringify(result, undefined, 4));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
