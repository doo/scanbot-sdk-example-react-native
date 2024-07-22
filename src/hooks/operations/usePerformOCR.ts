import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';
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
       * Display the result
       */
      const result = await ScanbotSDK.performOCR({
        imageFileUris: getImageUriFromPages(),
        ocrConfiguration: {
          engineMode: 'SCANBOT_OCR',
        },
      });
      /**
       * Handle the result
       */
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [getImageUriFromPages, setLoading]);
}
