import ScanbotSDK, {
  GenericDocumentRecognizerConfiguration,
} from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {errorMessageAlert, infoMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';
import {checkLicense} from '../../utils/SDKUtils';

export function useGenericDocumentScanner() {
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
       * Generic Document Recognizer requires OCR blobs.
       * If OCR blobs are not present or there is no 'de' language data, the scanner will fail
       * Return early if there are no installed languages
       */
      const ocrConfigsResult = await ScanbotSDK.getOCRConfigs();
      if (
        ocrConfigsResult.installedLanguages.length === 0 ||
        !ocrConfigsResult.installedLanguages.find(l => l === 'de')
      ) {
        infoMessageAlert(
          'Scanning is not possible since no OCR blobs were found',
        );
        return;
      }
      /**
       * Create the generic document scanner configuration object and
       * start the generic document scanner with the configuration
       */
      const config: GenericDocumentRecognizerConfiguration = {
        finderLineColor: '#ff0000',
      };
      const result = await ScanbotSDK.UI.startGenericDocumentRecognizer(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        console.log(JSON.stringify(result, undefined, 4));
        navigation.navigate(Screens.GENERIC_DOCUMENT_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [navigation]);
}
