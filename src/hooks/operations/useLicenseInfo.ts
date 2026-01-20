import {useCallback} from 'react';
import {errorMessageAlert, infoMessageAlert} from '@utils';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useLicenseInfo() {
  return useCallback(async () => {
    try {
      /**
       * Get the license info and display it as an Alert
       **/
      const info = await ScanbotSDK.getLicenseInfo();

      const text = [
        `• ${info.licenseStatusMessage}`,
        `• Expiration Date: ${new Date(
          info.expirationTimestamp * 1000,
        ).toDateString()}`,
        `• Status: ${info.status}`,
      ].join('\n');

      infoMessageAlert(text);
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, []);
}
