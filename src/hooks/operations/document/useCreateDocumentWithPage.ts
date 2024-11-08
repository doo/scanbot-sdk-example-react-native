import {useCallback} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';
import {useAddDocumentPage} from './useAddDocumentPage.ts';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useCreateDocumentWithPage() {
  const addDocumentPage = useAddDocumentPage();

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /** Create a document object */
      const documentResult = await ScanbotSDK.Document.createDocument();

      /** Add pages if status is OK */
      if (documentResult.status === 'OK') {
        await addDocumentPage(documentResult.uuid);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [addDocumentPage]);
}
