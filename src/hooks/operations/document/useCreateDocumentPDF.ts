import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {checkLicense, errorMessageAlert} from '@utils';
import Share from 'react-native-share';

import ScanbotSDK, {
  OCRConfiguration,
  PdfConfiguration,
} from 'react-native-scanbot-sdk';

export function useCreateDocumentPDF() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(
    async (documentID: string, sandwichedPDF: boolean = false) => {
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

        const result = await ScanbotSDK.Document.createPDF({
          documentID: documentID,
          pdfConfiguration: new PdfConfiguration(),
          ocrConfiguration: ocrConfiguration,
        });
        /**
         * Handle the result by displaying an action sheet
         */
        Share.open({
          title: 'Share PDF file',
          url: result.pdfFileUri,
          failOnCancel: false,
        });
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );
}
