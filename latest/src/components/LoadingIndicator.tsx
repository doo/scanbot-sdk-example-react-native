import {COLORS} from '../theme/Theme';
import React from 'react';
import {ActivityIndicator as AI, StyleSheet} from 'react-native';

export function LoadingIndicator({loading}: {loading: boolean}) {
  return (
    <AI
      size="large"
      color={COLORS.SCANBOT_RED}
      style={styles.loadingIndicator}
      animating={loading}
    />
  );
}

const styles = StyleSheet.create({
  loadingIndicator: {
    elevation: 6,
    position: 'absolute',
    left: '47%',
    top: '40%',
    width: '6%',
  },
});
