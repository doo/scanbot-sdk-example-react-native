import React from 'react';
import {useRoute} from '@react-navigation/native';
import {BarcodeResultScreenRouteProp} from '@utils';
import {
  BarcodeDocumentFormatField,
  ResultFieldRow,
  ResultHeader,
} from '@components';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BarcodeResultField} from 'react-native-scanbot-sdk';
import {COLORS} from '@theme';

function BarcodeItemResult({
  item,
  index,
}: {
  item: BarcodeResultField;
  index: number;
}) {
  return (
    <View style={styles.barcodeContainer}>
      <ResultHeader title={`Result ${index + 1}`} />
      <ResultFieldRow title={'Type:'} value={item.type} />
      <ResultFieldRow title={'Text:'} value={item.text} />
      <ResultFieldRow
        title={'With extension:'}
        value={item.textWithExtension}
      />
      <ResultFieldRow
        title={'Raw bytes:'}
        value={`[ ${item.rawBytes.map(b => b.toString(10)).join(', ')} ]`}
      />
      {item.formattedResult && (
        <BarcodeDocumentFormatField document={item.formattedResult} />
      )}
    </View>
  );
}

export function BarcodeResultScreen() {
  const {params: barcodeResult} = useRoute<BarcodeResultScreenRouteProp>();

  if (!barcodeResult.barcodes || barcodeResult.barcodes.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noBarcode}>No barcodes</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={barcodeResult.barcodes}
        keyExtractor={(item, index) => `${item.type}${index}`}
        renderItem={({item, index}) => (
          <BarcodeItemResult item={item} index={index} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noBarcode: {
    top: '50%',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  barcodeContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderBottomColor: COLORS.SCANBOT_RED,
    borderBottomWidth: 4,
  },
});
