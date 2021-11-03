import { BarcodeDocumentFormat } from 'react-native-scanbot-sdk/src/enum';

export class BarcodeDocumentFormats {
  public static isFilteringEnabled = false;

  public static list = [
    { key: 'AAMVA', value: true },
    { key: 'BOARDING_PASS', value: true },
    { key: 'DE_MEDICAL_PLAN', value: true },
    { key: 'DISABILITY_CERTIFICATE', value: true },
    { key: 'ID_CARD_PDF_417', value: true },
    { key: 'SEPA', value: true },
    { key: 'SWISS_QR', value: true },
    { key: 'VCARD', value: true },
  ];

  public static getAcceptedFormats(): BarcodeDocumentFormat[] {
    if (!BarcodeDocumentFormats.isFilteringEnabled) {
      return [];
    }

    const result: BarcodeDocumentFormat[] = [];
    BarcodeDocumentFormats.list.forEach(format => {
      if (format.value) {
        result.push(<BarcodeDocumentFormat>format.key);
      }
    });
    return result;
  }

  public static update(updated: any) {
    BarcodeDocumentFormats.list.forEach(original => {
      if (original.key === updated.key) {
        original.value = updated.value;
      }
    });
  }
}
