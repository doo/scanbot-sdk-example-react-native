import {PageData} from 'react-native-scanbot-sdk';
import {ImageStyle, StyleProp} from 'react-native';
import React, {useMemo} from 'react';
import {PreviewImage} from './PreviewImage.tsx';

export function PageImagePreview({
  page,
  style,
}: {
  page: PageData;
  style: StyleProp<ImageStyle>;
}) {
  const pageImageKey = useMemo(() => {
    return `${page?.uuid}_${Date.now()}`;
  }, [page]);

  return (
    <PreviewImage
      key={pageImageKey}
      imageUri={page.documentImageURI ?? page.originalImageURI}
      style={style}
    />
  );
}
