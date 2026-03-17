import {autorelease, ImageRef} from 'react-native-scanbot-sdk';

async function serializeImageRefAsBuffer(
  imageFileUri: string,
): Promise<string | undefined> {
  return await autorelease(async () => {
    /*
     * An example ref created from an image file URI, an image buffer or, obtained from a previous operation.
     * This is just an example, you can create an image reference from various sources as needed.
     */
    const exampleRef = await ImageRef.fromImageFileUri(imageFileUri);
    if (exampleRef !== null) {
      /*
       * The `serialize()` method allows you to serialize the image reference.
       * - Useful for storing the image reference in a format that can be easily transmitted or saved.
       * - The serialized reference can be deserialized later to retrieve the original image reference.
       */
      const serializedRef = await exampleRef.serialize('BUFFER');
      /*
       * The `buffer` property of the serialized reference contains the actual image data in a base64 string format.
       * This buffer can be used to reconstruct the image reference later when needed.
       */
      console.log('Encoded buffer', serializedRef?.buffer);

      return serializedRef?.buffer;
    }
  });
}
