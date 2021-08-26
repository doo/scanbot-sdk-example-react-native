import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type BarcodeMaskProps = {
  isActive: boolean;
  onPress: () => void;
};

const getStyles = (props: BarcodeMaskProps) =>
  StyleSheet.create({
    overlayView: {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      opacity: props.isActive ? 1 : 1,
    },
    tapToScanView: {
      marginTop: '20%',
      textAlign: 'center',
      alignItems: 'center',
    },
    tapToScanImage: {
      backgroundColor: 'yellow',
      width: 64,
      height: 64,
      textAlign: 'center',
      margin: 16,
    },
    tapToScanText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

export default function BarcodeMask(props: BarcodeMaskProps) {
  React.useEffect(() => {});

  const styles = getStyles(props);

  return (
    <View style={styles.overlayView}>
      <TouchableOpacity style={styles.tapToScanView} onPress={props.onPress}>
        <View style={styles.tapToScanImage} />
        <Text style={styles.tapToScanText}>Tap to Scan</Text>
      </TouchableOpacity>
    </View>
  );
}
