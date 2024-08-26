import React, {useContext} from 'react';
import {BarcodeFormatsContext} from '@context';
import {SwitchOptionsList} from '@components';

export function BarcodeFormatsScreen() {
  const {barcodeFormats, toggleBarcodeFormat} = useContext(
    BarcodeFormatsContext,
  );

  return (
    <SwitchOptionsList data={barcodeFormats} onPress={toggleBarcodeFormat} />
  );
}
