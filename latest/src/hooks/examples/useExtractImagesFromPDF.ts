import {useCallback, useContext} from 'react';
import {selectPDFFileUri} from '../../utils/FileUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';

export function useExtractImagesFromPDF() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
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
       * Handle the result
       */
      resultMessageAlert(JSON.stringify(imageFilesUrls, null, 2));
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
