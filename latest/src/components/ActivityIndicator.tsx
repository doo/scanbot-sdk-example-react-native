import {COLORS} from '../theme/Theme';
import React from 'react';
import {ActivityIndicator as Indicator, StyleSheet} from 'react-native';

export function ActivityIndicator({loading}: {loading: boolean}) {
  return (
    <Indicator
      size="large"
      color={COLORS.SCANBOT_RED}
      style={styles.progressIndicator}
      animating={loading}
    />
  );
}

const styles = StyleSheet.create({
  progressIndicator: {
    color: COLORS.SCANBOT_RED,
    elevation: 6,
    position: 'absolute',
    left: '47%',
    top: '40%',
    width: '6%',
  },
});
