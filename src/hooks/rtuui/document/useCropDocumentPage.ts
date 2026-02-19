import {checkLicense, errorMessageAlert} from '@utils';
import {useCallback, useContext} from 'react';
import {DocumentContext} from '@context';

import {CroppingConfiguration, ScanbotDocument} from 'react-native-scanbot-sdk';

export function useCropDocumentPage() {
  const {setDocument} = useContext(DocumentContext);

  return useCallback(
    async ({pageUuid, documentUuid}: {pageUuid: string; documentUuid: string}) => {
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
         * start the Cropping Screen with the configuration, documentUUID and pageUUID
         */
        const configuration = new CroppingConfiguration({
          documentUuid: documentUuid,
          pageUuid: pageUuid,
        });

        const documentResult = await ScanbotDocument.startCroppingScreen(
          configuration,
        );
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
