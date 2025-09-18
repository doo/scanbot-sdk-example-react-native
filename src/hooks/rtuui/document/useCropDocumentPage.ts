import {checkLicense, errorMessageAlert} from '@utils';
import {useCallback, useContext} from 'react';
import {DocumentContext} from '@context';

import {
  CroppingConfiguration,
  startCroppingScreen,
} from 'react-native-scanbot-sdk/ui_v2';

export function useCropDocumentPage() {
  const {setDocument} = useContext(DocumentContext);

  return useCallback(
    async ({pageID, documentID}: {pageID: string; documentID: string}) => {
      try {
        /**
         * Check the license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /**
         * Create the Cropping configuration object and
         * start the Cropping UI with the configuration, documentUUID and pageUUID
         */
        const configuration = new CroppingConfiguration({
          documentUuid: documentID,
          pageUuid: pageID,
        });

        const documentResult = await startCroppingScreen(configuration);
        /**
         * Handle the result if the result status is OK
         */
        if (documentResult.status === 'OK') {
          setDocument(documentResult.data);
        }
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    },
    [setDocument],
  );
}
