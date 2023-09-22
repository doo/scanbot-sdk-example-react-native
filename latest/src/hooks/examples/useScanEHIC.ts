import {useCallback} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';

export function useScanEHIC() {
  return useCallback(async () => {
    try {
      const result = await ScanbotSDK.UI.startEHICScanner({
        finderLineColor: '#ff0000',
      });

      if (result.status === 'OK') {
        const fields = result.fields.map(
          f => `${f.type}: ${f.value} (${f.confidence.toFixed(2)})`,
        );
        resultMessageAlert(fields.join('\n'));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
