import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';

export function useDetectBarcodesOnStillImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
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
        navigation.navigate(Screens.BARCODE_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
