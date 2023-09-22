import {useCallback} from 'react';
import ScanbotSDK, {MrzScannerConfiguration} from 'react-native-scanbot-sdk';
import {Platform} from 'react-native';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';

export function useMRZScanner() {
  return useCallback(async () => {
    try {
      let config: MrzScannerConfiguration = {
        finderTextHint:
          'Please hold your phone over the 2- or 3-line MRZ code at the front of your passport.',
      };

      if (Platform.OS === 'ios') {
        config.finderAspectRatio = {
          width: 0.9,
          height: 0.18,
        };
      }

      const result = await ScanbotSDK.UI.startMrzScanner(config);

      if (result.status === 'OK') {
        const fields = result.fields.map(
          f => `${f.name}: ${f.value} (${f.confidence.toFixed(2)})`,
        );
        resultMessageAlert(fields.join('\n'));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
