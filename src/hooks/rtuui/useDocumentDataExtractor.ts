import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

import ScanbotSDK, {
  autorelease,
  DocumentDataExtractorScreenConfiguration,
} from 'react-native-scanbot-sdk';

export function useDocumentDataExtractor() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the document data extractor configuration object and
       * start the document data extractor with the configuration
       */
      const config: DocumentDataExtractorScreenConfiguration = {
        finderLineColor: '#ff0000',
      };

      await autorelease(async () => {
        const result = await ScanbotSDK.UI.startDocumentDataExtractor(config);
        /**
         * Handle the result if the result status is OK
         */
        if (result.status === 'OK') {
          const navigationObject = await Promise.all(
            result.data.map(document => document.serialize()),
          );

          navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
            documents: navigationObject,
          });
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
