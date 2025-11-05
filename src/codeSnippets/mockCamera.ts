import ScanbotSDK, {MockCameraParams} from 'react-native-scanbot-sdk';

async function mockCamera() {
  const config: MockCameraParams = {
    imageFileUri: '{path to your image file}',
  };

  try {
    /**
     * For Android:
     *  API >= 33, READ_MEDIA_IMAGES and READ_MEDIA_VIDEO permissions are required.
     *  API < 33, READ_EXTERNAL_STORAGE permission is required.
     *  The image must have even values for both width and height.
     */
    await ScanbotSDK.mockCamera(config);
  } catch (error: any) {
    console.error(error);
  }
}
