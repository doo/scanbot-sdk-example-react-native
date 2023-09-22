import {useCallback, useContext} from 'react';
import {selectPDFFileUri} from '../../utils/FileUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert, infoMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../context/usePages';

export function useExtractPagesFromPDF() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {addMultiplePages} = useContext(PageContext);

  return useCallback(async () => {
    try {
      setLoading(true);

      const fileUrl = await selectPDFFileUri();
      if (!fileUrl) {
        return;
      }

      /**
       * Extract the pages from the pdf with the desired configuration options
       * Check if the status is 'CANCELED' to see if the user cancelled the operation
       * Check if the resulting Page Array is returned
       */
      const sdkResult = await ScanbotSDK.extractPagesFromPdf({
        pdfFilePath: fileUrl,
      });

      if (sdkResult.status === 'CANCELED') {
        return;
      }

      if (!sdkResult.pages) {
        infoMessageAlert('No pages were extracted from the document');
        return;
      }

      /**
       * Handle the result
       */
      addMultiplePages(sdkResult.pages);
      navigation.navigate(Screens.IMAGE_RESULTS);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [addMultiplePages, navigation, setLoading]);
}
