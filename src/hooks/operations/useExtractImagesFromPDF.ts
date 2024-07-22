import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  resultMessageAlert,
  selectPDFFileUri,
} from '@utils';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useExtractImagesFromPDF() {
  const {setLoading} = useContext(ActivityIndicatorContext);

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
       * Select a file
       * Return early if no file is selected or there is an issue selecting a file
       **/
      setLoading(true);
      const fileUrl = await selectPDFFileUri();
      if (!fileUrl) {
        return;
      }
      /**
       * Extract the images from the pdf with the desired configuration options
       * Check if the status is 'CANCELED' to see if the user cancelled the operation
       * Check if the resulting Page Array is returned
       */
      const sdkResult = await ScanbotSDK.extractImagesFromPdf({
        pdfFilePath: fileUrl,
      });
      const imageFilesUrls = sdkResult.imageFilesUrls;
      if (sdkResult.status === 'CANCELED' || !imageFilesUrls) {
        return;
      }
      /**
       * Handle the result by displaying an Alert
       */
      resultMessageAlert(JSON.stringify(imageFilesUrls, null, 2));
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
