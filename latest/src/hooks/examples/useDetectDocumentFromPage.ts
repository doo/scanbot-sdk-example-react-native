import {useContext} from 'react';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {useNavigation} from '@react-navigation/native';
import {PageContext} from '../../context/usePages';
import {selectImagesFromLibrary} from '../../utils/ImageUtils';
import {errorMessageAlert} from '../../utils/Alerts';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';

export function useDetectDocumentFromPage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {addPage} = useContext(PageContext);

  return useLicenseValidityCheckWrapper(async () => {
    try {
      setLoading(true);
      const selectedImageResult = await selectImagesFromLibrary();

      if (!selectedImageResult) {
        return;
      }

      /**
       * Create a page from the selected image
       * Detect the document on the page
       */
      let page = await ScanbotSDK.createPage(selectedImageResult[0]);
      page = await ScanbotSDK.detectDocumentOnPage(page);

      /**
       * Handle the result
       */
      addPage(page);
      navigation.navigate(Screens.IMAGE_RESULTS);
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  });
}
