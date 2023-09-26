import React, {useContext} from 'react';
import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarcodeFormatsContext} from '../context/useBarcodeFormats';
import {BarcodeFormat} from 'react-native-scanbot-sdk';

export function BarcodeFormatsScreen() {
  const {barcodeFormats, toggleBarcodeFormat} = useContext(
    BarcodeFormatsContext,
  );

  return (
    <View>
      <FlatList
        style={styles.list}
        data={Object.entries(barcodeFormats)}
        renderItem={({item: [format, value]}) => (
          <TouchableOpacity
            onPress={() => toggleBarcodeFormat(format as BarcodeFormat)}>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{format}</Text>
              <Switch
                style={styles.listItemSwitch}
                value={value}
                onValueChange={() => {
                  toggleBarcodeFormat(format as BarcodeFormat);
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={([format]) => format}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: '2%',
    height: '98%',
  },
  listItemContainer: {
    paddingLeft: 20,
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginHorizontal: 10,
  },
  listItemText: {
    fontSize: 12,
    textAlignVertical: 'center',
    lineHeight: 40,
    width: '80%',
  },
  listItemSwitch: {
    marginTop: 5,
  },
});
