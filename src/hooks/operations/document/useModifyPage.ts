import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';
import {ActivityIndicatorContext, DocumentContext} from '@context';

import {
  ModifyPageOptions,
  ParametricFilter,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

export function useModifyPage() {
  const {setDocument} = useContext(DocumentContext);
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(
    async ({
      parametricFilter,
      pageUuid,
      documentUuid,
    }: {
      parametricFilter: ParametricFilter;
      pageUuid: string;
      documentUuid: string;
    }) => {
      try {
        setLoading(true);
        /**
         * Check the license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /** Modify the document page */
        const options = new ModifyPageOptions();
        options.filters = [parametricFilter];

        const documentResult = await ScanbotDocument.modifyPage({
          documentUuid,
          pageUuid,
          options,
        });
        /**
         * Handle the result
         */
        setDocument(documentResult);
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [setDocument, setLoading],
  );
}
