import {useContext} from 'react';
import ScanbotSDK, {BarcodeScannerResult} from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';

export function useDetectBarcodesOnStillImages() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
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
        const barcodeResult: BarcodeScannerResult = {
          barcodes: result.results.flatMap(entry => entry.barcodeResults),
        };
        navigation.navigate(Screens.BARCODE_RESULT, barcodeResult);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
