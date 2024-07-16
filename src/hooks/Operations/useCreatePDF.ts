import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext, PageContext} from '@context';
import {checkLicense, errorMessageAlert, infoMessageAlert} from '@utils';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useCreatePDF() {
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
       * Create a PDF with the provided option
       */
      const result = await ScanbotSDK.createPDF({
        imageFileUris: getImageUriFromPages(),
        options: {
          pageSize: 'A4',
          pageDirection: 'PORTRAIT',
        },
      });
      /**
       * Handle the result by displaying an Alert
       */
      infoMessageAlert('PDF file created: ' + result.pdfFileUri);
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  }, [getImageUriFromPages, setLoading]);
}
