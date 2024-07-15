import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert, infoMessageAlert} from '@utils';
import {ActivityIndicatorContext, PageContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function usePerformOCR() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {getImageUriFromPages} = useContext(PageContext);

  return useCallback(async () => {
    try {
      setLoading(true);
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Perform optical character recognition with provided configuration and
       * Save the result as PDF
       */
      const result = await ScanbotSDK.performOCR({
        imageFileUris: getImageUriFromPages(),
        languages: ['en', 'de'],
        options: {
          outputFormat: 'FULL_OCR_RESULT',
          engineMode: 'SCANBOT_OCR',
        },
      });
      console.log(JSON.stringify(result, null, 2));
      /**
       * Handle the result by displaying an Alert
       */
      infoMessageAlert('PDF with OCR layer created: ' + result.pdfFileUri);
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  }, [getImageUriFromPages, setLoading]);
}
