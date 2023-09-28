import ScanbotSDK, {LicensePlateScanStrategy} from 'react-native-scanbot-sdk';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {COLORS} from '../../theme/Theme';

export function useLicensePlateScanner(scanStrategy: LicensePlateScanStrategy) {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.UI.startLicensePlateScanner({
        topBarBackgroundColor: COLORS.SCANBOT_RED,
        scanStrategy: scanStrategy,
      });

      if (result.status === 'OK') {
        resultMessageAlert(JSON.stringify(result));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  });
}
