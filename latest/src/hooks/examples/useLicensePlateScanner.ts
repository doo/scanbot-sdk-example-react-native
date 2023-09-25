import ScanbotSDK, {LicensePlateScanStrategy} from 'react-native-scanbot-sdk';
import {Colors} from '../../model/Colors';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useLicensePlateScanner(scanStrategy: LicensePlateScanStrategy) {
  return useLicenseValidityCheckWrapper(async () => {
    try {
      const result = await ScanbotSDK.UI.startLicensePlateScanner({
        topBarBackgroundColor: Colors.SCANBOT_RED,
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
