import {useCallback, useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {BarcodeDocumentFormatContext} from '../../context/useBarcodeDocumentFormats';
import {BarcodeFormatsContext} from '../../context/useBarcodeFormats';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {checkLicense} from '../../utils/SDKUtils';

export function useDetectBarcodesOnStillImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);

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
      const selectedImage = await selectImagesFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Detect the barcodes on the selected image
       */
      const [imageFileUri] = selectedImage;
      const result = await ScanbotSDK.detectBarcodesOnImage({
        acceptedDocumentFormats: acceptedBarcodeDocumentFormats,
        barcodeFormats: acceptedBarcodeFormats,
        imageFileUri: imageFileUri,
        stripCheckDigits: true,
        gs1HandlingMode: 'NONE',
      });
      /**
       * Handle the result by navigating to Screens.BARCODE_RESULT
       */
      navigation.navigate(Screens.BARCODE_RESULT, result);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [
    acceptedBarcodeDocumentFormats,
    acceptedBarcodeFormats,
    navigation,
    setLoading,
  ]);
}
