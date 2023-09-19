import {launchImageLibrary} from 'react-native-image-picker';
import {errorMessageAlert} from './Alerts';

export async function selectImagesFromLibrary(multipleImages?: boolean) {
  const imageResponse = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: multipleImages ? 0 : 1,
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
