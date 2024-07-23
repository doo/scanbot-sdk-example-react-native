import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, Switch, Text, View} from 'react-native';
import {BarcodeDocumentFormatContext} from '@context';
import {SwitchOptionsList} from '@components';

export function BarcodeDocumentFormatsScreen() {
  const {
    barcodeDocumentFormats,
    toggleBarcodeDocumentFormats,
    isFilteringEnabled,
    setIsFilteringEnabled,
  } = useContext(BarcodeDocumentFormatContext);

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerItemText}>
          Enable Document Format Filters
        </Text>
        <Switch
          value={isFilteringEnabled}
          onValueChange={_ => {
            setIsFilteringEnabled(filter => !filter);
          }}
        />
      </View>
      <SwitchOptionsList
        data={barcodeDocumentFormats}
        isFilteringEnabled={!isFilteringEnabled}
        onPress={toggleBarcodeDocumentFormats}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  headerItemText: {
    fontSize: 16,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
