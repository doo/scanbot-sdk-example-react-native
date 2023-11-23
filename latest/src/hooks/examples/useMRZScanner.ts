import ScanbotSDK, {MrzScannerConfiguration} from 'react-native-scanbot-sdk';
import {Platform} from 'react-native';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useMRZScanner() {
  return useLicenseValidityCheckWrapper(async () => {
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
        const fields = result as any;
        const displayText = Object.keys(fields)
          .map(key => `${key}: ${JSON.stringify(fields[key])}`)
          .join('\n');
        resultMessageAlert(displayText);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
