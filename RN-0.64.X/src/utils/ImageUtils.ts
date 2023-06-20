import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';

export interface MultipleImagePickerResponse {
  isCanceled: boolean;
  error?: string;
  imagesUris: string[];
}

export class ImageUtils {
  public static async pickFromGallery(): Promise<ImagePickerResponse> {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };
    return await new Promise<ImagePickerResponse>(resolve => {
      launchImageLibrary(options, async response => {
        resolve(response);
      });
    });
  }

  public static async pickMultipleImagesFromGallery(): Promise<MultipleImagePickerResponse> {
    return ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      maxFiles: 0,
    })
      .then(images => {
        var uris: string[] = images
          .filter(image => image && image.path)
          .map(image => image.path);
        var response: MultipleImagePickerResponse = {
          imagesUris: uris,
          isCanceled: false,
        };
        return response;
      })
      .catch(err => {
        var response: MultipleImagePickerResponse = {
          imagesUris: [],
          isCanceled: err.code === 'E_PICKER_CANCELLED',
          error: err,
        };
        return response;
      });
  }
}
