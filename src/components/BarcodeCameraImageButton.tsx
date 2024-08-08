import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '@theme';

export function BarcodeCameraImageButton(props: {
  onPress: () => void;
  source: ImageSourcePropType;
}) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.6}
      onPress={props.onPress}>
      <Image source={props.source} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.SCANBOT_RED,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    zIndex: 1,
    marginVertical: 8,
  },
});
