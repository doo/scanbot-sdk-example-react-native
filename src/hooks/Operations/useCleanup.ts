import {useCallback, useContext} from 'react';
import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
} from '@utils';
import {PageContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export const useCleanup = () => {
  const {deleteAllPages} = useContext(PageContext);

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
        deleteAllPages();
        infoMessageAlert('All pages have been deleted successfully!');
      } catch (e) {
        errorMessageAlert('ERROR: ' + JSON.stringify(e));
      }
    });
  }, [deleteAllPages]);
};
