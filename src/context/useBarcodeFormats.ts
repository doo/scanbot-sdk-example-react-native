import {BarcodeFormat} from 'react-native-scanbot-sdk';
import {createContext, useCallback, useState} from 'react';

const initialBarcodeFormats: Record<BarcodeFormat, boolean> = {
  AZTEC: true,
  CODABAR: true,
  CODE_25: true,
  CODE_39: true,
  CODE_93: true,
  CODE_128: true,
  DATA_MATRIX: true,
  EAN_8: true,
  EAN_13: true,
  ITF: true,
  PDF_417: true,
  QR_CODE: true,
  UPC_A: true,
  UPC_E: true,
  MSI_PLESSEY: true,
  IATA_2_OF_5: true,
  INDUSTRIAL_2_OF_5: true,
  MICRO_QR_CODE: true,
  USPS_INTELLIGENT_MAIL: true,
  ROYAL_MAIL: true,
  ROYAL_TNT_POST: true,
  JAPAN_POST: true,
  AUSTRALIA_POST: true,
  DATABAR_LIMITED: true,
  GS1_COMPOSITE: true,
  MICRO_PDF_417: true,
  DATABAR: true,
  DATABAR_EXPANDED: true,
  CODE_11: true,
  CODE_32: true,
  MAXI_CODE: true,
  RMQR_CODE: true,
};

interface BarcodeFormatsContextValue {
  barcodeFormats: Record<BarcodeFormat, boolean>;
  toggleBarcodeFormat: (value: BarcodeFormat) => void;
  acceptedBarcodeFormats: Array<BarcodeFormat>;
}

export const BarcodeFormatsContext = createContext<BarcodeFormatsContextValue>({
  barcodeFormats: initialBarcodeFormats,
  toggleBarcodeFormat: _barcodeFormat => {},
  acceptedBarcodeFormats: [],
});

export function useBarcodeFormats() {
  const [barcodeFormats, setBarcodeFormats] = useState(initialBarcodeFormats);

  const toggleBarcodeFormat = useCallback((updated: BarcodeFormat) => {
    setBarcodeFormats(format => ({
      ...format,
      [updated]: !format[updated],
    }));
  }, []);

  const acceptedBarcodeFormats = Object.entries(barcodeFormats)
    .filter(([_, value]) => value)
    .map(([key]) => key as BarcodeFormat);

  return {
    barcodeFormats,
    toggleBarcodeFormat,
    acceptedBarcodeFormats,
  };
}
