import {autorelease, DeepPartial, ImageRef} from 'react-native-scanbot-sdk';

async function serializeImageRefAsReference(
  imageFileUri: string,
): Promise<DeepPartial<ImageRef> | undefined | null> {
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
      const serializedRef = await exampleRef.serialize('REFERENCE');
      /*
       * The `uniqueId` property of the serialized reference contains a unique identifier for the image reference.
       * This unique ID can be used to reference the image in future operations without needing to handle the actual image data directly.
       */
      console.log('Serialized Ref UUID', serializedRef?.uniqueId);

      return serializedRef;
    }
  });
}
