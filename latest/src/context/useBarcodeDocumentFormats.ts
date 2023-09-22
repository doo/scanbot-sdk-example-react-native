import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {BarcodeDocumentFormat} from 'react-native-scanbot-sdk';

const initialBarcodeDocumentFormats: Record<BarcodeDocumentFormat, boolean> = {
  AAMVA: true,
  BOARDING_PASS: true,
  DE_MEDICAL_PLAN: true,
  MEDICAL_CERTIFICATE: true,
  ID_CARD_PDF_417: true,
  SEPA: true,
  SWISS_QR: true,
  VCARD: true,
  GS1: true,
};

interface BarcodeDocumentFormatsValue {
  barcodeDocumentFormats: Record<BarcodeDocumentFormat, boolean>;
  isFilteringEnabled: boolean;
  acceptedBarcodeDocumentFormats: Array<BarcodeDocumentFormat>;
  toggleBarcodeDocumentFormats: (updated: BarcodeDocumentFormat) => void;
  setIsFilteringEnabled: Dispatch<SetStateAction<boolean>>;
}

export const BarcodeDocumentFormatContext =
  createContext<BarcodeDocumentFormatsValue>({
    barcodeDocumentFormats: initialBarcodeDocumentFormats,
    isFilteringEnabled: false,
    acceptedBarcodeDocumentFormats: [],
    toggleBarcodeDocumentFormats: (_updated: BarcodeDocumentFormat) => {},
    setIsFilteringEnabled(
      _value: ((prevState: boolean) => boolean) | boolean,
    ): void {},
  });

export function useBarcodeDocumentFormats() {
  const [barcodeDocumentFormats, setBarcodeDocumentFormats] = useState<
    Record<BarcodeDocumentFormat, boolean>
  >(initialBarcodeDocumentFormats);
  const [isFilteringEnabled, setIsFilteringEnabled] = useState(false);

  const toggleBarcodeDocumentFormats = useCallback(
    (updated: BarcodeDocumentFormat) => {
      setBarcodeDocumentFormats(formats => ({
        ...formats,
        [updated]: !formats[updated],
      }));
    },
    [],
  );

  const acceptedBarcodeDocumentFormats = isFilteringEnabled
    ? Object.entries(barcodeDocumentFormats)
        .filter(([_, value]) => value)
        .map(([key]) => key as BarcodeDocumentFormat)
    : [];

  return {
    barcodeDocumentFormats,
    isFilteringEnabled,
    acceptedBarcodeDocumentFormats,
    toggleBarcodeDocumentFormats,
    setIsFilteringEnabled,
  };
}
