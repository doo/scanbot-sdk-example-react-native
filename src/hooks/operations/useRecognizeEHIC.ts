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
  EuropeanHealthInsuranceCardRecognizerConfiguration,
} from 'react-native-scanbot-sdk';

export function useRecognizeEHIC() {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

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
      /** Recognize health insurance card on the selected image */
      const result = await ScanbotSDK.recognizeEHIC({
        imageFileUri: selectedImage,
        configuration: new EuropeanHealthInsuranceCardRecognizerConfiguration(),
      });
      /**
       * Handle the result by navigating to result screen
       */
      if (result.status !== 'FAILED_DETECTION') {
        navigation.navigate(Screens.PLAIN_DATA_RESULT, {
          data: result.fields.map(field => ({
            key: field.type,
            value: `${field.value} (${field.confidence.toFixed(2)})`,
          })),
        });
      } else {
        infoMessageAlert('No EHIC found.');
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
