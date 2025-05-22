import {PreviewImage} from './PreviewImage';
import React from 'react';
import {StyleSheet} from 'react-native';

export function ResultImage({imageUri}: {imageUri: string | undefined}) {
  if (!imageUri) {
    return null;
  }

  return <PreviewImage imageSource={imageUri} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'contain',
    backgroundColor: '#222222',
    paddingHorizontal: 12,
  },
});
