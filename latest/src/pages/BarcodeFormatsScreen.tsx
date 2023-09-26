import React, {useContext} from 'react';
import {View} from 'react-native';
import {BarcodeFormatsContext} from '../context/useBarcodeFormats';
import {BarcodeFormat} from 'react-native-scanbot-sdk';
import {SwitchOptionsList} from '../components/SwitchOptionsList';

export function BarcodeFormatsScreen() {
  const {barcodeFormats, toggleBarcodeFormat} = useContext(
    BarcodeFormatsContext,
  );

  return (
    <View>
      <SwitchOptionsList
        data={barcodeFormats}
        onPress={format => toggleBarcodeFormat(format as BarcodeFormat)}
      />
    </View>
  );
}
