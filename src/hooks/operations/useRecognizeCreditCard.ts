import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';

import ScanbotSDK, {
  CreditCardScannerConfiguration,
} from 'react-native-scanbot-sdk';

export function useRecognizeCreditCard() {
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

      const configuration = new CreditCardScannerConfiguration();
      configuration.requireCardholderName = true;
      // Configure other parameters as needed.

      /**
       * Recognize Credit card on the selected image and
       * Handle the result by navigating to Screens.CREDIT_CARD_RESULT
       */
      const result = await ScanbotSDK.recognizeCreditCard({
        imageFileUri: selectedImage,
        configuration: configuration,
      });

      /**
       * Handle the result if the result status is OK
       */
      navigation.navigate(Screens.CREDIT_CARD_RESULT, {
        creditCardDocument: result.creditCard,
        recognitionStatus: result.scanningStatus,
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
