import ScanbotSDK, {LicensePlateScanStrategy} from 'react-native-scanbot-sdk';
import {Colors} from '../../model/Colors';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {useCallback} from 'react';

export function useLicensePlateScanner(scanStrategy: LicensePlateScanStrategy) {
  return useCallback(async () => {
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
  }, [scanStrategy]);
}
