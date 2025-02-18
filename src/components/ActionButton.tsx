import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS} from '@theme';

export const ActionButton = ({
  onPress,
  textStyle,
  containerStyle,
  label,
}: {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  label: string;
}) => {
  return (
    <TouchableOpacity
      style={[styles.actionButtonContainer, containerStyle]}
      onPress={onPress}>
      <Text style={[styles.actionButtonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.SCANBOT_RED,
    padding: '4%',
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
