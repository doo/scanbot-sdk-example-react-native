import React from 'react';
import {
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '@theme';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export function BarcodeCameraViewResult(props: {
  lastDetectedBarcode: string;
  onFinderToggle: () => void;
  onFlashToggle: () => void;
  flashEnabled: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[styles.resultsView, props.style]}>
      <Text style={styles.resultsViewHeader}>Results</Text>
      <ScrollView>
        <Text ellipsizeMode={'tail'} style={styles.resultsText}>
          {props.lastDetectedBarcode}
        </Text>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={props.onFinderToggle}>
          <Image source={require('../assets/ic_finder_view.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={props.onFlashToggle}>
          <Image
            source={
              props.flashEnabled
                ? require('../assets/ic_flash_on.png')
                : require('../assets/ic_flash_off.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultsView: {
    flex: 0.75,
    backgroundColor: COLORS.SCANBOT_RED,
    shadowRadius: 4,
    shadowOpacity: 0.4,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  resultsViewHeader: {
    marginTop: '4%',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  resultsText: {
    padding: 16,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderRadius: 12,
  },
});
