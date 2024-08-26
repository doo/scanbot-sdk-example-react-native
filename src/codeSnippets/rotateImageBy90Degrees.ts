/* eslint @typescript-eslint/no-unused-vars: 0 */
import ScanbotSDK from 'react-native-scanbot-sdk';

async function rotateImageBy90Degrees(imageUri: string) {
  try {
    const rotatedImageResult = await ScanbotSDK.rotateImage(imageUri, 90);
    return rotatedImageResult.imageFileUri;
  } catch (error: any) {
    console.error(error);
  }
}
