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
  getAcceptedFormats: () => Array<{key: BarcodeDocumentFormat; value: boolean}>;
  toggleBarcodeDocumentFormats: (updated: BarcodeDocumentFormat) => void;
  setIsFilteringEnabled: Dispatch<SetStateAction<boolean>>;
}

export const BarcodeDocumentFormatContext =
  createContext<BarcodeDocumentFormatsValue>({
    barcodeDocumentFormats: initialBarcodeDocumentFormats,
    isFilteringEnabled: false,
    getAcceptedFormats: () => [],
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

  const getAcceptedFormats = useCallback(() => {
    if (!isFilteringEnabled) {
      return [];
    }

    return Object.entries(barcodeDocumentFormats)
      .map(([key, value]) => ({
        key: key as BarcodeDocumentFormat,
        value: value,
      }))
      .filter(({value}) => value);
  }, [barcodeDocumentFormats, isFilteringEnabled]);

  const toggleBarcodeDocumentFormats = useCallback(
    (updated: BarcodeDocumentFormat) => {
      setBarcodeDocumentFormats(formats => ({
        ...formats,
        [updated]: !formats[updated],
      }));
    },
    [],
  );

  return {
    barcodeDocumentFormats,
    isFilteringEnabled,
    getAcceptedFormats,
    toggleBarcodeDocumentFormats,
    setIsFilteringEnabled,
  };
}
