import {useCallback, useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert, resultMessageAlert} from '../../utils/Alerts';

export function useDetectDocumentFromImage() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
      setLoading(true);
      const selectedImageResult = await selectImagesFromLibrary();

      if (!selectedImageResult) {
        return;
      }

      const uri = selectedImageResult[0];
      const result = await ScanbotSDK.detectDocument(uri);
      const blur = await ScanbotSDK.estimateBlur({imageFileUri: uri});

      resultMessageAlert(
        JSON.stringify(result) + '\n' + JSON.stringify(blur, null, 2),
      );
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);
}
