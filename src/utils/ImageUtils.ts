import {launchImageLibrary} from 'react-native-image-picker';
import {errorMessageAlert} from './Alerts';

/**
 * Select single or multiple images form the Image Library.
 *
 * @param multipleImages boolean for switching between multiple image selection or single image selection.
 * @return {Promise<string[]|undefined>} An array of image URI if the operation is successful or undefined otherwise
 */

export async function selectImagesFromLibrary(): Promise<string[] | undefined> {
  const imageResponse = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 0,
    quality: 1,
  });

  if (imageResponse.didCancel || !imageResponse.assets) {
    return undefined;
  }

  const imageUri = imageResponse.assets.every(image => image.uri !== undefined);

  if (!imageUri) {
    errorMessageAlert('Error picking image from gallery!');
    return undefined;
  } else {
    return imageResponse.assets.map(image => image.uri as string);
  }
}

export async function selectImageFromLibrary(): Promise<string | undefined> {
  const imageResponse = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    quality: 1,
  });

  if (imageResponse.didCancel || !imageResponse.assets) {
    return undefined;
  }

  const imageUri = imageResponse.assets.every(image => image.uri !== undefined);

  if (!imageUri) {
    errorMessageAlert('Error picking image from gallery!');
    return undefined;
  } else {
    return imageResponse.assets[0].uri as string;
  }
}
