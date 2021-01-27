import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';

export class ImageUtils {
  public static async pickFromGallery(): Promise<ImagePickerResponse> {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    return await new Promise<ImagePickerResponse>((resolve) => {
      launchImageLibrary(options, async (response) => {
        resolve(response);
      });
    });
  }
}
