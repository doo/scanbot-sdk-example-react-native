import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';
import {VinScannerConfiguration} from 'react-native-scanbot-sdk/src/configurations';

export function useVinScanner() {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      const config: VinScannerConfiguration = {
        topBarBackgroundColor: COLORS.SCANBOT_RED,
      };

      const result = await ScanbotSDK.UI.startVinScanner(config);
      if (result.status !== 'OK') {
        return;
      }
      const msg = [
        `- Raw Text: ${result.rawText}`,
        result.confidenceValue &&
          `- Confidence: ${(result.confidenceValue * 100).toFixed(0)}%`,
        `- Validation: ${
          result.validationSuccessful ? 'SUCCESSFUL' : 'NOT SUCCESSFUL'
        }`,
      ].join('\n\n');

      resultMessageAlert(msg);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
