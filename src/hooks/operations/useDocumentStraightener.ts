import {useCallback, useContext} from 'react';
import {ActivityIndicatorContext} from '@context';
import {useNavigation} from '@react-navigation/native';
import {
  AspectRatio,
  autorelease,
  DocumentStraighteningParameters,
} from 'react-native-scanbot-sdk';
import {ScanbotDocumentEnhancer} from 'react-native-scanbot-sdk/src/DocumentEnhancer.ts';
import {
  checkLicense,
  errorMessageAlert,
  infoMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
  selectImageFromLibrary,
} from '@utils';

export function useDocumentStraightener() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {setLoading} = useContext(ActivityIndicatorContext);

  return useCallback(async () => {
    try {
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
      setLoading(true);
      const selectedImage = await selectImageFromLibrary();
      if (!selectedImage) {
        return;
      }

      /**
       * Note: The result of straightenImage contains an ImageRef, thus
       * the autorelease block must be used to properly dispose of the ImageRef.
       */
      await autorelease(async () => {
        /** Create the default configuration instance */
        const straighteningParameters = new DocumentStraighteningParameters();

        /** Configure the straightening mode as needed **/
        straighteningParameters.straighteningMode = 'STRAIGHTEN';

        /**
         * The straightening parameters can be customized to fit the expected aspect ratio of the document
         * to be straightened. This can help the straightening algorithm to achieve better results.
         */
        straighteningParameters.aspectRatios = [
          new AspectRatio({width: 5, height: 7}),
          new AspectRatio({width: 1, height: 1}),
          new AspectRatio({width: 16, height: 9}),
          new AspectRatio({width: 3, height: 4}),
        ];
        const result = await ScanbotDocumentEnhancer.straightenImage({
          image: selectedImage,
          straighteningParameters: straighteningParameters,
        });

        if (!result.straightenedImage) {
          throw Error(
            'Straightening failed. The result does not contain a straightened image.',
          );
        }

        const straightenedImage = await result.straightenedImage.encodeImage();
        if (!straightenedImage) {
          throw Error('Encoding failed.');
        }

        if (result.straightenedImage) {
          navigation.navigate(Screens.PLAIN_DATA_RESULT, {
            imageUris: ['data:image/jpeg;base64,' + straightenedImage],
          });
        } else {
          infoMessageAlert('Document could not be straightened');
        }
      });
    } catch (e: any) {
      errorMessageAlert(e.message);
    } finally {
      setLoading(false);
    }
  }, [navigation, setLoading]);
}
