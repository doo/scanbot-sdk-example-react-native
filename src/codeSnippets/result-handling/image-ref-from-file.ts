import {autorelease, ImageRef} from 'react-native-scanbot-sdk';

async function createImageRefFromFile(imageFileUri: string) {
  /*
   * Creates an image reference from the image file URI.
   *
   * - The image reference can be used in various Scanbot SDK operations that require an image input.
   * - The image file URI should point to a valid image file in a supported format (e.g., JPEG, PNG).
   * - An auto-release pool is used to manage memory efficiently when working with image references.
   * - The image reference will be automatically released after the block of code is executed, preventing memory leaks.
   */
  await autorelease(async () => {
    const ref = await ImageRef.fromImageFileUri(imageFileUri);
    if (ref !== null) {
      /*
       * Use the image reference for further processing:
       *
       * - Pass it to Scanbot SDK functions that require an image input.
       * - Retrieve a base64 string from the image reference.
       * - Perform additional operations as needed.
       */
    }
  });
}
