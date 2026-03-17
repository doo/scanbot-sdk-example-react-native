import {autorelease, DeepPartial, ImageRef} from 'react-native-scanbot-sdk';

async function createImageRefFromSerializedReference(
  serializedReference: DeepPartial<ImageRef>,
) {
  /*
   * Creates an image reference from the provided serialized reference.
   *
   * - The image reference can be used in various Scanbot SDK operations that require an image input.
   * - The serialized reference should contain a valid unique identifier for the image reference.
   * - An auto-release pool is used to manage memory efficiently when working with image references.
   */
  await autorelease(async () => {
    const ref = ImageRef.deserialize(serializedReference);
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
