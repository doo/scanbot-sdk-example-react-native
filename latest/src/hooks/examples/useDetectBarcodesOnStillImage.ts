import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useDetectBarcodesOnStillImage() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      setLoading(true);

      const selectedImage = await selectImagesFromLibrary();
      if (!selectedImage) {
        return;
      }

      const result = await ScanbotSDK.detectBarcodesOnImage({
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        imageFileUri: selectedImage[0],
        stripCheckDigits: true,
      });

      if (result.status === 'OK') {
        resultMessageAlert(JSON.stringify(result.barcodes));
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
