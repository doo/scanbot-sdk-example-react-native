import {useCallback, useContext} from 'react';
import {checkLicense, errorMessageAlert} from '@utils';
import {ActivityIndicatorContext, PageContext} from '@context';
import Share from 'react-native-share';

import ScanbotSDK, {ScanbotBinarizationFilter} from 'react-native-scanbot-sdk';

export function useWriteTIFF() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {getImageUriFromPages} = useContext(PageContext);

  return useCallback(
    async (binarized: boolean) => {
      try {
        setLoading(true);
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /**
         * Save images as a tiff file
         */
        const result = await ScanbotSDK.writeTIFF({
          imageFileUris: getImageUriFromPages(),
          options: {
            binarizationFilter: binarized
              ? new ScanbotBinarizationFilter()
              : undefined,
            dpi: 300,
            compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression
          },
        });
        /**
         * Handle the result by displaying an action sheet
         */
        Share.open({
          title: 'Share TIFF file',
          url: result.tiffFileUri,
          failOnCancel: false,
        });
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [getImageUriFromPages, setLoading],
  );
}
