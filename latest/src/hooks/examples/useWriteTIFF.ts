import {useCallback, useContext} from 'react';
import {checkLicense, FILE_ENCRYPTION_ENABLED} from '../../utils/SDKUtils';
import {errorMessageAlert, infoMessageAlert} from '../../utils/Alerts';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {PageContext} from '../../context/usePages';

export function useWriteTIFF() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {getImageUriFromPages} = useContext(PageContext);

  return useCallback(
    async (binarized: boolean) => {
      if (FILE_ENCRYPTION_ENABLED) {
        // TODO encryption for TIFF files currently not supported
        infoMessageAlert(
          'Encryption for TIFF files currently not supported. ' +
            'In order to test TIFF please disable image file encryption.',
        );
        return;
      }
      try {
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        setLoading(true);
        /**
         * Save images as a tiff file
         */
        const result = await ScanbotSDK.writeTIFF({
          imageFileUris: getImageUriFromPages(),
          options: {
            oneBitEncoded: binarized, // "true" means create 1-bit binarized black and white TIFF
            dpi: 300, // optional DPI. default value is 200
            compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
          },
        });
        /**
         * Handle the result by displaying an Alert
         */
        infoMessageAlert('TIFF file created: ' + result.tiffFileUri);
      } catch (e) {
        errorMessageAlert('ERROR: ' + JSON.stringify(e));
      } finally {
        setLoading(false);
      }
    },
    [getImageUriFromPages, setLoading],
  );
}
