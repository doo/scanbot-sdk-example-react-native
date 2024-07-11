import {useCallback, useContext} from 'react';
import {selectPDFFileUri} from '../../utils/FileUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {errorMessageAlert, infoMessageAlert} from '../../utils/Alerts';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../context/usePages';
import {checkLicense} from '../../utils/SDKUtils';

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
