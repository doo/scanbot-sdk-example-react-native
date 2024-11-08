import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '@theme';

function BottomActionBarButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.bottomBarButton} onPress={onPress}>
      <Text style={styles.bottomBarButtonText} numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

interface BottomActionBarProps {
  buttonOneTitle: string;
  buttonTwoTitle: string;
  buttonThreeTitle: string;
  onButtonOne: () => void;
  onButtonTwo: () => void;
  onButtonThree: () => void;
}

export function BottomActionBar({
  buttonOneTitle,
  buttonTwoTitle,
  buttonThreeTitle,
  onButtonOne,
  onButtonTwo,
  onButtonThree,
}: BottomActionBarProps) {
  return (
    <View style={styles.bottomBar}>
      <BottomActionBarButton title={buttonOneTitle} onPress={onButtonOne} />
      <BottomActionBarButton title={buttonTwoTitle} onPress={onButtonTwo} />
      <BottomActionBarButton title={buttonThreeTitle} onPress={onButtonThree} />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: COLORS.SCANBOT_RED,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  bottomBarButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
    color: 'white',
  },
});
