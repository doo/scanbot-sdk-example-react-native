import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../theme/Theme';

export function ResultHeader(props: {
  title: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.SCANBOT_RED,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: 'bold',
    flex: 3,
    color: 'white',
  },
});
