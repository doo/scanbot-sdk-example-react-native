import {
  autorelease,
  BufferImageLoadOptions,
  ImageRef,
} from 'react-native-scanbot-sdk';

async function createImageRefFromBuffer(buffer: string) {
  /*
   * Creates an image reference from the provided buffer.
   *
   * - The image reference can be used in various Scanbot SDK operations that require an image input.
   * - The buffer should contain valid image data in a supported format (e.g., JPEG, PNG).
   * - An auto-release pool is used to manage memory efficiently when working with image references.
   * - The image reference will be automatically released after the block of code is executed, preventing memory leaks.
   */
  await autorelease(async () => {
    const ref = await ImageRef.fromEncodedBuffer(
      buffer,
      new BufferImageLoadOptions(),
    );
    if (ref !== null) {
      /*
       * Use the image reference for further processing:
       *
       * - Pass it to Scanbot SDK functions that require an image input.
       * - Save the image reference to a file.
       * - Perform additional operations as needed.
       */
    }
  });
}
