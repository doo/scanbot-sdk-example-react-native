import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {useCallback, useContext} from 'react';

import ScanbotSDK, {ParametricFilter} from 'react-native-scanbot-sdk';

export function useApplyFilters() {
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
         */
        setLoading(true);
        const result = await ScanbotSDK.applyImageFilters(selectedImage, [
          filter,
        ]);
        /**
         * Handle the result by navigating to result screen
         */
        navigation.navigate(Screens.PLAIN_DATA_RESULT, {
          imageUris: [result.imageFileUri],
        });
      } catch (e: any) {
        errorMessageAlert(e.message);
      } finally {
        setLoading(false);
      }
    },
    [navigation, setLoading],
  );
}
