import {useCallback} from 'react';
import {
  deleteConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
} from '@utils';

import ScanbotSDK from 'react-native-scanbot-sdk';

export const useCleanup = () => {
  return useCallback(() => {
    deleteConfirmationAlert(
      'Cleanup SDK storage ?',
      'Cleanup',
      async () => {
        try {
          /**
           * Remove the Pages, Images, PDFs & TIFF files created with ScanbotSDK
           */
          await ScanbotSDK.cleanupStorage();
          /**
           * Remove the Pages from device/server storage if any
           */
          infoMessageAlert('Storage has been cleaned successfully!');
        } catch (e: any) {
          errorMessageAlert(e.message);
        }
      },
    );
  }, []);
};
