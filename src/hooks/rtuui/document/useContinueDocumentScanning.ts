import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback, useContext} from 'react';
import {DocumentContext} from '@context';

import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

export function useContinueDocumentScanning() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {loadDocument} = useContext(DocumentContext);

  return useCallback(
    async (documentUuid: string) => {
      try {
        /**
         * Check the license status and return early
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
        configuration.documentUuid = documentUuid;
        configuration.cleanScanningSession = false;

        await ScanbotDocument.startScanner(configuration);
        loadDocument(documentUuid);
        navigation.navigate(Screens.DOCUMENT_RESULT);
      } catch (e: any) {
        errorMessageAlert(e.message);
      }
    },
    [loadDocument, navigation],
  );
}
