import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectPDFFileUri,
} from '@utils';
import {ActivityIndicatorContext, PageContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK from 'react-native-scanbot-sdk';

export function useExtractPagesFromPDF() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {addMultiplePages} = useContext(PageContext);

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
       * Select a file
       * Return early if no file is selected or there is an issue selecting a file
       **/
      setLoading(true);
      const fileUrl = await selectPDFFileUri();
      if (!fileUrl) {
        return;
      }
      /**
       * Extract the pages from the pdf with the desired configuration options
       * Check if the resulting Page Array is returned
       */
      const result = await ScanbotSDK.extractPagesFromPdf({
        pdfFilePath: fileUrl,
      });
      console.log(JSON.stringify(result, null, 2));
      if (!result.pages) {
        infoMessageAlert('No pages were extracted from the document');
        return;
      }
      /**
       * Handle the result by displaying an Alert
       */
      addMultiplePages(result.pages);
      navigation.navigate(Screens.IMAGE_RESULTS);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [addMultiplePages, navigation, setLoading]);
}
