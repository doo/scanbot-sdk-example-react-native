import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {Field} from 'react-native-scanbot-sdk';

export function ResultFieldRow(props: {
  title: string;
  value: Field | string | number | boolean | undefined;
  style?: StyleProp<ViewStyle>;
}) {
  if (props.value === null || props.value === undefined) {
    return null;
  }

  return (
    <View style={[styles.container, props.style && props.style]}>
      <Text style={styles.titleText}>
        {props.title.split(/(?<![A-Z])(?=[A-Z])/).join(' ')}
      </Text>
      {typeof props.value === 'boolean' && (
        <Text style={styles.valueText}>{props.value ? 'TRUE' : 'FALSE'}</Text>
      )}
      {typeof props.value === 'number' && (
        <Text style={styles.valueText}>{props.value.toString(10)}</Text>
      )}
      {typeof props.value === 'string' && (
        <Text style={styles.valueText}>{props.value}</Text>
      )}
      {typeof props.value === 'object' && (
        <Text style={styles.valueText}>{props.value.value?.text}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    columnGap: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  titleText: {
    fontSize: 18,
    lineHeight: 18,
    fontWeight: 'bold',
    maxWidth: '50%',
    flex: 3,
  },
  valueText: {
    flex: 4,
    textAlign: 'right',
    fontSize: 16,
    lineHeight: 18,
  },
});
