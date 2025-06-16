import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {checkLicense, errorMessageAlert} from '@utils';
import Share from 'react-native-share';

import ScanbotSDK, {
  ScanbotBinarizationFilter,
  TiffGeneratorParameters,
} from 'react-native-scanbot-sdk';

export function useCreateDocumentTIFF() {
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(
    async (documentID: string, binarized: boolean) => {
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
         * Create a tiff file from the document
         */
        const result = await ScanbotSDK.Document.createTIFF({
          documentID,
          configuration: new TiffGeneratorParameters({
            binarizationFilter: binarized
              ? new ScanbotBinarizationFilter()
              : undefined,
            compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE',
          }),
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
    [setLoading],
  );
}
