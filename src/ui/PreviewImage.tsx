import React from 'react';
import {Image} from 'react-native';
import ScanbotSDK from 'react-native-scanbot-sdk/src';
import {SDKUtils} from '../utils/SDKUtils';

type PreviewImageProps = {
  imageUri?: string;
  style: any;
};

export default function PreviewImage(props: PreviewImageProps) {
  const [uri, setUri] = React.useState<string | undefined>(undefined);

  if (!props.imageUri) {
    return null;
  }

  React.useEffect(() => {
    const loadDecryptedImageData = async () => {
      const result = await ScanbotSDK.getImageData(props.imageUri);
      const imgMimeType =
        SDKUtils.IMAGE_FILE_FORMAT === 'JPG' ? 'image/jpeg' : 'image/png';
      setUri(`data:${imgMimeType};base64,${result.base64ImageData}`);
    };

    if (SDKUtils.FILE_ENCRYPTION_ENABLED) {
      // File encryption is enabled, so we need to load the decrypted image data
      // as base64 from SDK. The SDK decrypts the image data under the hood.
      loadDecryptedImageData();
    } else {
      setUri(props.imageUri!);
    }
  }, [props.imageUri]);

  if (!props.imageUri) {
    return null;
  }
  return <Image source={{uri: uri}} style={props.style} />;
}
