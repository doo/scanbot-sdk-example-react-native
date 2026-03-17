import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {checkLicense, errorMessageAlert} from '@utils';
import Share from 'react-native-share';

import {
  OcrConfiguration,
  PdfConfiguration,
  ScanbotPdfGenerator,
} from 'react-native-scanbot-sdk';

export function useCreateDocumentPDF() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(
    async (documentUuid: string, sandwichedPDF: boolean = false) => {
      try {
        setLoading(true);
        /**
         * Check the license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /**
         * Create a PDF with the provided option
         */
        const ocrConfiguration: OcrConfiguration | undefined = sandwichedPDF
          ? {
              engineMode: 'SCANBOT_OCR',
            }
          : undefined;

        const pdfFileUri = await ScanbotPdfGenerator.generateFromDocument({
          documentUuid: documentUuid,
          pdfConfiguration: new PdfConfiguration(),
          ocrConfiguration: ocrConfiguration,
        });
        /**
         * Handle the result by displaying an action sheet
         */
        await Share.open({
          title: 'Share PDF file',
          url: pdfFileUri,
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
