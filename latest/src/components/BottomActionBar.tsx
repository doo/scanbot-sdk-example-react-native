import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../model/Colors';

export function BottomActionBar(props: {
  onAdd: () => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <View style={styles.bottomBar}>
      <Text style={styles.bottomBarButton} onPress={props.onAdd}>
        ADD
      </Text>
      <Text style={styles.bottomBarButton} onPress={props.onSave}>
        SAVE
      </Text>
      <Text
        style={[styles.bottomBarButton, styles.alignRight]}
        onPress={props.onDelete}>
        DELETE ALL
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
