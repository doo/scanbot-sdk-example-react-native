import {PageContext} from '../../context/usePages';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '../../context/useLoading';
import ScanbotSDK, {ImageFilterType} from 'react-native-scanbot-sdk';
import {errorMessageAlert} from '../../utils/Alerts';
import {checkLicense} from '../../utils/SDKUtils';

export function useImportImageAndApplyFilter() {
  const {addPage} = useContext(PageContext);
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(
    async (filter: ImageFilterType, selectedImage: string) => {
      try {
        /**
         * Check license status and return early
         * if the license is not valid
         */
        if (!(await checkLicense())) {
          return;
        }
        /**
         * Apply the selected image filer on the selected image
         * Handle the result by
         * Creating a page of the returned result from applyImageFilter
         * Detect the document on the page
         * Navigating to Screens.IMAGE_RESULTS
         */
        setLoading(true);
        const result = await ScanbotSDK.applyImageFilter(selectedImage, filter);
        if (result.imageFileUri) {
          const page = await ScanbotSDK.createPage(result.imageFileUri);
          const documentPage = await ScanbotSDK.detectDocumentOnPage(page);
          addPage(documentPage);
          navigation.navigate(Screens.IMAGE_RESULTS);
        }
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [addPage, navigation, setLoading],
  );
}
