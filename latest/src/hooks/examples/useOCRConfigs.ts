import {useCallback} from 'react';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import ScanbotSDK from 'react-native-scanbot-sdk';

export function useOCRConfigs() {
  return useCallback(async () => {
    try {
      const result = await ScanbotSDK.getOCRConfigs();
      resultMessageAlert(JSON.stringify(result));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
