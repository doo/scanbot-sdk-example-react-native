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
                  DeDriverLicenseFrontDocumentType,
                  DeDriverLicenseBackDocumentType,
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
          /**
           * The extracted document is serialized for use in navigation parameters.
           *
           * By default, images are serialized as references.
           * If the destination screen does not require image data, you can disable image serialization
           * by passing the optional flag.
           */
          const navigationObject = await result.serialize();

          navigation.navigate(Screens.DOCUMENT_DATA_EXTRACTOR_RESULT, {
            documents: [navigationObject],
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
