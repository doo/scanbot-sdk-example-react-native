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
  DeHealthInsuranceCardFrontDocumentType,
  DeIdCardBackDocumentType,
  DeIdCardFrontDocumentType,
  DePassportDocumentType,
  DeResidencePermitBackDocumentType,
  DeResidencePermitFrontDocumentType,
  DocumentDataExtractorCommonConfiguration,
  DocumentDataExtractorConfiguration,
  EuropeanDriverLicenseBackDocumentType,
  EuropeanDriverLicenseFrontDocumentType,
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
       * Check the license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Select an image from the Image Library
       * Return early if no image is selected, or there is an issue selecting an image
       **/
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }
      /**
       * Extract document data on the selected image
       * Add the desired document types that data extraction should be done
       * Handle the result by navigating to Screens.DOCUMENT_DATA_EXTRACTOR_RESULT
       *
       * An autorelease pool is required because the result object may contain image references.
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
                  EuropeanDriverLicenseFrontDocumentType,
                  EuropeanDriverLicenseBackDocumentType,
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
          navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
            document: result.document,
            extractionStatus: result.status,
          });
        } else {
          infoMessageAlert('No document detected');
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
