import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type BarcodeMaskProps = {
  isActive: boolean;
  onPress: () => void;
};

const getStyles = (_props: BarcodeMaskProps) =>
  StyleSheet.create({
    overlayView: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: 0.6,
      justifyContent: 'center',
    },
    tapToScanView: {
      textAlign: 'center',
      alignItems: 'center',
    },
    tapToScanImage: {
      width: 48,
      height: 48,
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
        <Image
          source={require('../assets/ic_camera.png')}
          style={styles.tapToScanImage}
        />
        <Text style={styles.tapToScanText}>Tap to Scan</Text>
      </TouchableOpacity>
    </View>
  );
}
