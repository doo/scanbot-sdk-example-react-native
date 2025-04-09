import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

type PreviewImageProps = {
  imageSource?: string;
  loading?: boolean;
  style?: StyleProp<ImageStyle>;
};

export function PreviewImage({imageSource, loading, style}: PreviewImageProps) {
  if (!imageSource) {
    return null;
  }

  if (loading) {
    return (
      <View style={[style && style, styles.activityIndicator]}>
        <ActivityIndicator animating={loading} size={'small'} />
      </View>
    );
  }

  return <Image source={{uri: imageSource}} style={style} />;
}

const styles = StyleSheet.create({
  activityIndicator: {alignItems: 'center', justifyContent: 'center'},
});
