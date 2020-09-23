import {StyleSheet} from 'react-native';
import {Colors} from './Colors';

export enum FeatureId {
  DocumentScanner = 1,
  ImportImage,
  ViewPages,
  ScanBarcodes,
  DetectBarcodesOnStillImage,
  BarcodeFormatsFilter,
  ScanMRZ,
  ScanEHIC,
  ScanGT,
  LicenseInfo,
  OcrConfigs,
  LearnMore,
}
export class Examples {
  public static list = [
    {
      title: 'DOCUMENT SCANNER',
      data: [
        {id: FeatureId.DocumentScanner, title: 'Scan Document'},
        {id: FeatureId.ImportImage, title: 'Import Image & Detect Document'},
        {id: FeatureId.ViewPages, title: 'View Image Results'},
      ],
    },
    {
      title: 'BARCODE DETECTOR',
      data: [
        {id: FeatureId.ScanBarcodes, title: 'Scan QR-/Barcode'},
        {
          id: FeatureId.DetectBarcodesOnStillImage,
          title: 'Import Image & Detect Barcodes',
        },
        {
          id: FeatureId.BarcodeFormatsFilter,
          title: 'Set Barcode Formats Filter',
        },
      ],
    },
    {
      title: 'DATA DETECTORS',
      data: [
        {id: FeatureId.ScanMRZ, title: 'Scan MRZ on ID Card'},
        {id: FeatureId.ScanEHIC, title: 'Scan Health Insurance Card'},
        {id: FeatureId.ScanGT, title: 'Scan Generic Text'},
      ],
    },
    {
      title: 'MISCELLANEOUS',
      data: [
        {id: FeatureId.LicenseInfo, title: 'View License Info'},
        {id: FeatureId.OcrConfigs, title: 'View OCR Configs'},
        {
          id: FeatureId.LearnMore,
          title: 'Learn More About Scanbot SDK',
          customStyle: StyleSheet.create({
            content: {
              textAlign: 'center',
              fontSize: 14,
              marginTop: 25,
              marginBottom: 10,
              color: Colors.SCANBOT_RED,
            }
          }),
        },
      ],
    },
  ];
}
