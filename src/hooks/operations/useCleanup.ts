import {useCallback} from 'react';
import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
} from '@utils';

import ScanbotSDK from 'react-native-scanbot-sdk';

export const useCleanup = () => {
  return useCallback(() => {
    deleteAllConfirmationAlert(async () => {
      try {
        /**
         * Remove the Pages,Images,PDFs & TIFF files created with ScanbotSDK
         */
        await ScanbotSDK.cleanup();
        /**
         * Remove the Pages from device/server storage if any
         */
        infoMessageAlert('All pages have been deleted successfully!');
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    });
  }, []);
};
