import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {DocumentContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useRemovePage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setDocument} = useContext(DocumentContext);

  return useCallback(
    async ({pageID, documentID}: {pageID: string; documentID: string}) => {
      try {
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /** Remove the document page */
        const documentResult = await ScanbotSDK.Document.removePage({
          documentID: documentID,
          pageID: pageID,
        });
        /**
         * Handle the result if result status is OK
         */
        if (documentResult.status === 'OK') {
          setDocument(documentResult);
          navigation.navigate(Screens.DOCUMENT_RESULT);
        }
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    },
    [navigation, setDocument],
  );
}
