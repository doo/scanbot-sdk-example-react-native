import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useOCRConfigs() {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.getOCRConfigs();
      resultMessageAlert(JSON.stringify(result));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
