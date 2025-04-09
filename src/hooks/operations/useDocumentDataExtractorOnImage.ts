import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK, {
  autorelease,
  DeDriverLicenseBackCategoriesA1DocumentType,
  DeDriverLicenseBackCategoriesA2DocumentType,
  DeDriverLicenseBackCategoriesADocumentType,
  DeDriverLicenseBackCategoriesAMDocumentType,
  DeDriverLicenseBackCategoriesB1DocumentType,
  DeDriverLicenseBackCategoriesBDocumentType,
  DeDriverLicenseBackCategoriesBEDocumentType,
  DeDriverLicenseBackCategoriesC1DocumentType,
  DeDriverLicenseBackCategoriesC1EDocumentType,
  DeDriverLicenseBackCategoriesCDocumentType,
  DeDriverLicenseBackCategoriesCEDocumentType,
  DeDriverLicenseBackCategoriesD1DocumentType,
  DeDriverLicenseBackCategoriesD1EDocumentType,
  DeDriverLicenseBackCategoriesDDocumentType,
  DeDriverLicenseBackCategoriesDEDocumentType,
  DeDriverLicenseBackCategoriesDocumentType,
  DeDriverLicenseBackCategoriesLDocumentType,
  DeDriverLicenseBackCategoriesTDocumentType,
  DeDriverLicenseBackCategoryDocumentType,
  DeDriverLicenseBackDocumentType,
  DeDriverLicenseFrontDocumentType,
  DeHealthInsuranceCardFrontDocumentType,
  DeIdCardBackDocumentType,
  DeIdCardFrontDocumentType,
  DePassportDocumentType,
  DeResidencePermitBackDocumentType,
  DeResidencePermitFrontDocumentType,
  DocumentDataExtractorCommonConfiguration,
  DocumentDataExtractorConfiguration,
  EuropeanHealthInsuranceCardDocumentType,
  MRZDocumentType,
} from 'react-native-scanbot-sdk';

export function useDocumentDataExtractorOnImage() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
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
       * Select an image from the Image Library
       * Return early if no image is selected or there is an issue selecting an image
       **/
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Recognize Generic Document on the selected image
       * Add the desired document types that data extraction should be done
       * Handle the result by navigating to Screens.DOCUMENT_DATA_EXTRACTOR_RESULT
       */
      await autorelease(async () => {
        const result = await ScanbotSDK.documentDataExtractor({
          imageFileUri: selectedImage,
          configuration: new DocumentDataExtractorConfiguration({
            configurations: [
              new DocumentDataExtractorCommonConfiguration({
                acceptedDocumentTypes: [
                  MRZDocumentType,
                  DeIdCardFrontDocumentType,
                  DeIdCardBackDocumentType,
                  DePassportDocumentType,
                  DeDriverLicenseFrontDocumentType,
                  DeDriverLicenseBackDocumentType,
                  DeDriverLicenseBackCategoryDocumentType,
                  DeDriverLicenseBackCategoriesDocumentType,
                  DeDriverLicenseBackCategoriesADocumentType,
                  DeDriverLicenseBackCategoriesA1DocumentType,
                  DeDriverLicenseBackCategoriesA2DocumentType,
                  DeDriverLicenseBackCategoriesAMDocumentType,
                  DeDriverLicenseBackCategoriesBDocumentType,
                  DeDriverLicenseBackCategoriesB1DocumentType,
                  DeDriverLicenseBackCategoriesBEDocumentType,
                  DeDriverLicenseBackCategoriesCDocumentType,
                  DeDriverLicenseBackCategoriesC1DocumentType,
                  DeDriverLicenseBackCategoriesC1EDocumentType,
                  DeDriverLicenseBackCategoriesCEDocumentType,
                  DeDriverLicenseBackCategoriesDDocumentType,
                  DeDriverLicenseBackCategoriesD1DocumentType,
                  DeDriverLicenseBackCategoriesD1EDocumentType,
                  DeDriverLicenseBackCategoriesDEDocumentType,
                  DeDriverLicenseBackCategoriesLDocumentType,
                  DeDriverLicenseBackCategoriesTDocumentType,
                  DeResidencePermitFrontDocumentType,
                  DeResidencePermitBackDocumentType,
                  EuropeanHealthInsuranceCardDocumentType,
                  DeHealthInsuranceCardFrontDocumentType,
                ],
              }),
            ],
          }),
        });
        if (result.document) {
          const navigationObject = await result.serialize();

          navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
            documents: [navigationObject],
          });
        } else {
          infoMessageAlert('No recognized document found.');
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
