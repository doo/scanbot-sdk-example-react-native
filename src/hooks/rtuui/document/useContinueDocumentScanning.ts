import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback, useContext} from 'react';
import {DocumentContext} from '@context';

import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

export function useContinueDocumentScanning() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {loadDocument} = useContext(DocumentContext);

  return useCallback(
    async (documentID: string) => {
      try {
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /**
         * Create the document configuration object and
         * start the document scanner with the configuration and documentUUID
         */
        const configuration = new DocumentScanningFlow();
        configuration.documentUuid = documentID;
        configuration.cleanScanningSession = false;

        await startDocumentScanner(configuration);
        loadDocument(documentID);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    },
    [loadDocument, navigation],
  );
}
