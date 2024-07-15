import {ActivityIndicatorContext, PageContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback, useContext} from 'react';

import ScanbotSDK, {
  CustomBinarizationFilter,
  ParametricFilter,
} from 'react-native-scanbot-sdk';

export function useApplyFiltersOnImage() {
  const {addPage} = useContext(PageContext);
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useCallback(
    async (filter: ParametricFilter, selectedImage: string) => {
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
        const result = await ScanbotSDK.applyImageFilters(selectedImage, [
          filter,
          new CustomBinarizationFilter(),
        ]);
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
