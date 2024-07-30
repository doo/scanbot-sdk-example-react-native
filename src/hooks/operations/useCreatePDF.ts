import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext, PageContext} from '@context';
import {checkLicense, errorMessageAlert, infoMessageAlert} from '@utils';

import ScanbotSDK, {OCRConfiguration} from 'react-native-scanbot-sdk';

export function useCreatePDF() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {getImageUriFromPages} = useContext(PageContext);

  return useCallback(
    async (sandwichedPDF: boolean = false) => {
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
        const ocrConfiguration: OCRConfiguration | undefined = sandwichedPDF
          ? {
              engineMode: 'SCANBOT_OCR',
            }
          : undefined;

        const result = await ScanbotSDK.createPDF({
          imageFileUris: getImageUriFromPages(),
          options: {
            pageSize: 'A4',
            pageDirection: 'PORTRAIT',
            ocrConfiguration: ocrConfiguration,
          },
        });
        /**
         * Handle the result by displaying an Alert
         */
        infoMessageAlert('PDF file created: ' + result.pdfFileUri);
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [getImageUriFromPages, setLoading],
  );
}
