import React from 'react';
import {Image} from 'react-native';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk/src';
import {SDKUtils} from '../utils/SDKUtils';

type PreviewImageProps = {
  page: Page;
  style: any;
};

export default function PreviewImage(props: PreviewImageProps) {
  const [uri, setUri] = React.useState('data:image/png;base64,');

  React.useEffect(() => {
    const loadDecryptedImageData = async () => {
      const result = await ScanbotSDK.getImageData(
        props.page.documentPreviewImageFileUri!,
      );
      const imgMimeType =
        SDKUtils.IMAGE_FILE_FORMAT === 'JPG' ? 'image/jpeg' : 'image/png';
      setUri(`data:${imgMimeType};base64,${result.base64ImageData}`);
    };

    if (SDKUtils.FILE_ENCRYPTION_ENABLED) {
      // File encryption is enabled, so we need to load the decrypted image data
      // as base64 from SDK. The SDK decrypts the image data under the hood.
      loadDecryptedImageData();
    } else {
      // File encryption is NOT enabled, so we just use the image file URI.
      setUri(props.page.documentPreviewImageFileUri!);
    }
  }, [props.page]);

  return <Image source={{uri: uri}} style={props.style} />;
}
