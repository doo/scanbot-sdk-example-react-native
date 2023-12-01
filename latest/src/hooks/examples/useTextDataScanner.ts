import ScanbotSDK, {
  TextDataScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';
import {setRtuTimeout} from '../../utils/SDKUtils';

export function useTextDataScanner() {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: TextDataScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        textDataScannerStep: {
          allowedSymbols: '',
          aspectRatio: {
            height: 1.0,
            width: 5.0,
          },
          guidanceText: 'Place the LC display in the frame to scan it',
          pattern: '',
          preferredZoom: 2.0,
          shouldMatchSubstring: false,
          significantShakeDelay: -1,
          unzoomedFinderHeight: 40,
        },
      };

      setRtuTimeout(async () => {
        await ScanbotSDK.UI.closeTextDataScanner();
      });
      const result = await ScanbotSDK.UI.startTextDataScanner(config);
      const data = result?.result?.text;
      if (result.status !== 'OK' || !data) {
        return;
      }
      resultMessageAlert(JSON.stringify(result));
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
