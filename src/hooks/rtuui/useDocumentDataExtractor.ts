import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {
  DocumentDataExtractorScreenConfiguration,
  startDocumentDataExtractor,
} from 'react-native-scanbot-sdk/ui_v2';
import {COLORS} from '@theme';

export function useDocumentDataExtractor() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(async () => {
    try {
      /**
       * Check the license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Create the document data extractor configuration object and
       * start the document data extractor with the configuration
       */
      const configuration = new DocumentDataExtractorScreenConfiguration();
      configuration.introScreen.explanation.visible = true;
      configuration.extractionProgress.progressColor = COLORS.SCANBOT_RED;

      const result = await startDocumentDataExtractor(configuration);
      /**
       * Handle the result if the result status is OK
       */
      if (result.status === 'OK' && result.data.document) {
        navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
          document: result.data.document,
          extractionStatus: result.data.recognitionStatus,
        });
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
