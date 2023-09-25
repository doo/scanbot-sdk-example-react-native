import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useDetectBarcodesOnStillImages() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      setLoading(true);

      const selectedImage = await selectImagesFromLibrary(true);
      if (!selectedImage) {
        return;
      }

      const result = await ScanbotSDK.detectBarcodesOnImages({
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        imageFileUris: selectedImage,
        stripCheckDigits: true,
      });

      if (result.status === 'OK') {
        resultMessageAlert(JSON.stringify(result.results));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
