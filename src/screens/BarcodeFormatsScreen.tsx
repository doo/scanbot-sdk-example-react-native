import React, {useContext} from 'react';
import {BarcodeFormatsContext} from '../context/useBarcodeFormats';
import {SwitchOptionsList} from '../components/SwitchOptionsList';

export function BarcodeFormatsScreen() {
  const {barcodeFormats, toggleBarcodeFormat} = useContext(
    BarcodeFormatsContext,
  );

  return (
    <SwitchOptionsList data={barcodeFormats} onPress={toggleBarcodeFormat} />
  );
}
