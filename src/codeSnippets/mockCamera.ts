import ScanbotSDK from 'react-native-scanbot-sdk';

async function mockCamera() {
  try {
    /**
     * For Android:
     *  API >= 33, READ_MEDIA_IMAGES and READ_MEDIA_VIDEO permissions are required.
     *  API < 33, READ_EXTERNAL_STORAGE permission is required.
     *  The image must have even values for both width and height.
     */
    await ScanbotSDK.mockCamera({
      imageFileUri: '{path to your image file}',
    });
  } catch (error: any) {
    console.error(error);
  }
}
