import {useCallback, useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../context/usePages';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {checkLicense} from '../../utils/SDKUtils';

export function useDetectDocumentFromPage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {addPage} = useContext(PageContext);

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
      const selectedImageResult = await selectImagesFromLibrary();
      if (!selectedImageResult) {
        return;
      }
      /**
       * Create a page from the selected image and
       * Detect the document on the page
       */
      const [imageFileUri] = selectedImageResult;
      let page = await ScanbotSDK.createPage(imageFileUri);
      page = await ScanbotSDK.detectDocumentOnPage(page);
      /**
       * Handle the result by navigating to Screens.IMAGE_RESULTS
       */
      addPage(page);
      navigation.navigate(Screens.IMAGE_RESULTS);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [addPage, navigation, setLoading]);
}
