import ScanbotSDK from 'react-native-scanbot-sdk';
import {ImageStyle, StyleProp} from 'react-native';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {PreviewImage} from './PreviewImage.tsx';
import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from '@utils';
import {DocumentContext} from '@context';

export function PageImagePreview({
  pageID,
  style,
}: {
  pageID: string;
  style: StyleProp<ImageStyle>;
}) {
  const {document} = useContext(DocumentContext);
  const [uri, setUri] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const page = useMemo(
    () => document?.pages.find(p => p.uuid === pageID),
    [document?.pages, pageID],
  );

  useEffect(() => {
    if (!page) {
      return;
    }

    async function loadDecryptedImageData() {
      try {
        setLoading(true);
        if (page && (page.documentImagePreviewURI || page.originalImageURI)) {
          const result = await ScanbotSDK.getImageData(
            page.documentImagePreviewURI || page.originalImageURI,
          );
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
      setUri(
        `${
          page.documentImagePreviewURI || page.originalImageURI
        }?=${Date.now()}`,
      );
    }
  }, [setLoading, page]);

  return <PreviewImage loading={loading} imageSource={uri} style={style} />;
}
