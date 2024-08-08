import {SafeAreaView, ScrollView, StyleSheet, ViewStyle} from 'react-native';
import React from 'react';

export function ResultContainer(props: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <SafeAreaView style={[styles.container, props.style && props.style]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 2,
  },
});
