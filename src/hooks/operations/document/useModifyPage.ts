import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';
import {DocumentContext} from '@context';

import ScanbotSDK, {ParametricFilter} from 'react-native-scanbot-sdk';

export function useModifyPage() {
  const {setDocument} = useContext(DocumentContext);

  return useCallback(
    async ({
      parametricFilter,
      pageID,
      documentID,
    }: {
      parametricFilter: ParametricFilter;
      pageID: string;
      documentID: string;
    }) => {
      try {
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /** Modify the document page */
        const documentResult = await ScanbotSDK.Document.modifyPage({
          documentID: documentID,
          pageID: pageID,
          filters: [parametricFilter],
        });
        /**
         * Handle the result
         */
        setDocument(documentResult);
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    },
    [setDocument],
  );
}
