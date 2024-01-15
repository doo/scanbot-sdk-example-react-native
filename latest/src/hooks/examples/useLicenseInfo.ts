import {useCallback} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, infoMessageAlert} from '../../utils/Alerts';

export function useLicenseInfo() {
  return useCallback(async () => {
    try {
      /**
       * Get the license info and display it as an Alert
       **/
      const info = await ScanbotSDK.getLicenseInfo();
      const text =
        `• The license is ${info.isLicenseValid ? 'VALID' : 'NOT VALID'}` +
        `\n\n• Expiration Date: ${
          info.licenseExpirationDate
            ? new Date(info.licenseExpirationDate)
            : 'N/A'
        }` +
        `\n\n• Status: ${info.licenseStatus}`;

      infoMessageAlert(text);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
