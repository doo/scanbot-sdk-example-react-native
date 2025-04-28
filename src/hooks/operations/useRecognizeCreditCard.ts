import {useCallback, useContext} from 'react';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';
import {ActivityIndicatorContext} from '@context';

import ScanbotSDK, {
  CreditCardScannerConfiguration,
} from 'react-native-scanbot-sdk';
import {useNavigation} from '@react-navigation/native';
import {CreditCardScannerUiResult} from 'react-native-scanbot-sdk/ui_v2';

export function useRecognizeCreditCard() {
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
       * Recognize Credit card on the selected image and
       * Handle the result by navigating to Screens.CREDIT_CARD_RESULT
       */
      const result = await ScanbotSDK.recognizeCreditCard({
        imageFileUri: selectedImage,
        configuration: new CreditCardScannerConfiguration(),
      });

      /**
       * Handle the result if the result status is OK
       */
      navigation.navigate(Screens.CREDIT_CARD_RESULT, {
        card: new CreditCardScannerUiResult({
          creditCard: result.creditCard,
          recognitionStatus: result.scanningStatus,
        }),
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
