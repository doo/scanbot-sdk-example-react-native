import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert, selectImagesFromLibrary} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useContinueDocumentScanning} from '@hooks';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useCreateDocumentWithPage() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const continueScanning = useContinueDocumentScanning();

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
       * Select an image from the Image Library
       * Return early if no image is selected or there is an issue selecting an image
       **/
      setLoading(true);
      const selectedImageResult = await selectImagesFromLibrary(true);
      if (!selectedImageResult) {
        return;
      }
      /** Create a document object */
      const documentResult = await ScanbotSDK.Document.createDocument({
        imageFileUris: selectedImageResult,
        documentDetection: true,
      });

      /** Continue scanning  */
      if (documentResult.status === 'OK') {
        await continueScanning(documentResult.uuid);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading, continueScanning]);
}
