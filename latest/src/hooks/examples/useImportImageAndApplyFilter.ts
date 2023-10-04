import {PageContext} from '../../context/usePages';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useContext} from 'react';
import {ActivityIndicatorContext} from '../../context/useLoading';
import {useLicenseValidityCheckWrapper} from '../useLicenseValidityCheck';
import ScanbotSDK, {ImageFilterType} from 'react-native-scanbot-sdk';
import {errorMessageAlert} from '../../utils/Alerts';

export function useImportImageAndApplyFilter() {
  const {addPage} = useContext(PageContext);
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  return useLicenseValidityCheckWrapper(
    async (filter: ImageFilterType, selectedImage: string) => {
      try {
        setLoading(true);
        const result = await ScanbotSDK.applyImageFilter(selectedImage, filter);

        if (result.status !== 'OK' || !result.imageFileUri) {
          return;
        }

        const page = await ScanbotSDK.createPage(result.imageFileUri);
        const documentPage = await ScanbotSDK.detectDocumentOnPage(page);
        addPage(documentPage);
        navigation.navigate(Screens.IMAGE_RESULTS);
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
  );
}
