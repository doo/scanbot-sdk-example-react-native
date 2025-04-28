import ScanbotSDK, {PageData} from 'react-native-scanbot-sdk';
import {ImageStyle, StyleProp} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {PreviewImage} from './PreviewImage.tsx';
import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from '@utils';

export function PageImagePreview({
  page,
  style,
}: {
  page: PageData;
  style: StyleProp<ImageStyle>;
}) {
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDecryptedImageData() {
      try {
        setLoading(true);
        if (page.documentImageURI != null) {
          const result = await ScanbotSDK.getImageData(page.documentImageURI);
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
      setUri(`${page.documentImageURI}?=${Date.now()}`);
    }
  }, [page.documentImageURI, setLoading]);

  const pageImageKey = useMemo(() => {
    return `${page?.uuid}_${Date.now()}`;
  }, [page]);

  return (
    <PreviewImage
      key={pageImageKey}
      loading={loading}
      imageSource={uri}
      style={style}
    />
  );
}
