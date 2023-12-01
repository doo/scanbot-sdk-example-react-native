import ScanbotSDK, {
  ImageResultsConfiguration,
  ImageResultsFieldsConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useScanGenericDocument() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(async () => {
    try {
      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeGenericDocumentRecognizer();
      });
      const result = await ScanbotSDK.UI.startGenericDocumentRecognizer({
        imageResultsConfiguration: new ImageResultsConfiguration({
          resultType: 'STORE_IMAGE',
          fieldsConfiguration: new ImageResultsFieldsConfiguration({
            includeExtraFields: true,
          }),
        }),
      });

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
