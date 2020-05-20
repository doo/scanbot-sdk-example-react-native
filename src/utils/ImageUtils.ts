import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';

export class ImageUtils {
  public static async pickFromGallery(): Promise<ImagePickerResponse> {
    const options = {
      title: 'Import image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    return await new Promise<ImagePickerResponse>((resolve) => {
      ImagePicker.launchImageLibrary(options, async (response) => {
        resolve(response);
      });
    });
  }
}
