import {ScanbotImageProcessor} from 'react-native-scanbot-sdk';

async function decryptImage(encryptedImageURI: string) {
  const decryptedBase64ImageResult = await ScanbotImageProcessor.readImageData(
    encryptedImageURI,
  );
}
