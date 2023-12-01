import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useScanEHIC() {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeEHICScanner();
      });

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
  });
}
