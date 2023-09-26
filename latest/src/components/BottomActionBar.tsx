import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../model/Colors';

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
      <Text style={styles.bottomBarButton} onPress={onButtonOne}>
        {buttonOneTitle}
      </Text>
      <Text style={styles.bottomBarButton} onPress={onButtonTwo}>
        {buttonTwoTitle}
      </Text>
      <Text
        style={[styles.bottomBarButton, styles.alignRight]}
        onPress={onButtonThree}>
        {buttonThreeTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.SCANBOT_RED,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  bottomBarButton: {
    flex: 0,
    height: 50,
    lineHeight: 50,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 10,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 13,
  },
  alignRight: {
    marginLeft: 'auto',
  },
});
