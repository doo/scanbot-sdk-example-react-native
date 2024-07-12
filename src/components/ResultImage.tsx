import {PreviewImage} from './PreviewImage';
import React from 'react';
import {StyleSheet} from 'react-native';

export function ResultImage({imageUri}: {imageUri: string | undefined}) {
  if (!imageUri) {
    return null;
  }

  return <PreviewImage imageUri={imageUri} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#222222',
    margin: 16,
  },
});
