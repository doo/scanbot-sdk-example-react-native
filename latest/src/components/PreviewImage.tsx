import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import ScanbotSDK from 'react-native-scanbot-sdk/src';
import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from '../utils/SDKUtils';

type PreviewImageProps = {
  imageUri?: string;
  style: StyleProp<ImageStyle>;
};

export function PreviewImage({imageUri, style}: PreviewImageProps) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDecryptedImageData() {
      try {
        setLoading(true);
        if (imageUri != null) {
          const result = await ScanbotSDK.getImageData(imageUri);
          const imgMimeType =
            IMAGE_FILE_FORMAT === 'JPG' ? 'image/jpeg' : 'image/png';
          setUri(`data:${imgMimeType};base64,${result.base64ImageData}`);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    if (FILE_ENCRYPTION_ENABLED) {
      // File encryption is enabled, so we need to load the decrypted image data
      // as base64 from SDK. The SDK decrypts the image data under the hood.
      loadDecryptedImageData();
    } else {
      setUri(imageUri!);
    }
  }, [imageUri, setLoading]);

  if (!imageUri) {
    return null;
  }

  if (loading) {
    return (
      <View style={[style, styles.activityIndicator]}>
        <ActivityIndicator animating={loading} size={'small'} />
      </View>
    );
  }

  return <Image source={{uri: uri}} style={style} />;
}

const styles = StyleSheet.create({
  activityIndicator: {alignItems: 'center', justifyContent: 'center'},
});
