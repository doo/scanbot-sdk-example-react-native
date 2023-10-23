import {BarcodeFormat} from 'react-native-scanbot-sdk';

export class BarcodeFormats {
  public static list = [
    {key: 'AZTEC', value: true},
    {key: 'CODABAR', value: true},
    {key: 'CODE_25', value: true},
    {key: 'CODE_39', value: true},
    {key: 'CODE_93', value: true},
    {key: 'CODE_128', value: true},
    {key: 'DATA_MATRIX', value: true},
    {key: 'EAN_8', value: true},
    {key: 'EAN_13', value: true},
    {key: 'ITF', value: true},
    {key: 'PDF_417', value: true},
    {key: 'QR_CODE', value: true},
    {key: 'RSS_14', value: true},
    {key: 'RSS_EXPANDED', value: true},
    {key: 'UPC_A', value: true},
    {key: 'UPC_E', value: true},
    {key: 'MSI_PLESSEY', value: true},
    {key: 'IATA_2_OF_5', value: true},
    {key: 'INDUSTRIAL_2_OF_5', value: true},
  ];

  public static getAcceptedFormats(): BarcodeFormat[] {
    let result: BarcodeFormat[] = [];
    BarcodeFormats.list.forEach(format => {
      if (format.value) {
        result.push(<BarcodeFormat>format.key);
      }
    });
    return result;
  }
  public static update(updated: any) {
    BarcodeFormats.list.forEach(original => {
      if (original.key === updated.key) {
        original.value = updated.value;
      }
    });
  }
}
