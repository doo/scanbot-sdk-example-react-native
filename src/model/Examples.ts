import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export enum FeatureId {
  DocumentScanner = 1,
  DetectDocumentFromPage,
  DetectDocumentFromImage,
  ExtractPagesFromPdf,
  ExtractImagesFromPdf,
  ViewPages,
  ScanBarcodes,
  ScanBatchBarcodes,
  DetectBarcodesOnStillImage,
  DetectBarcodesOnStillImages,
  BarcodeFormatsFilter,
  BarcodeDocumentFormatsFilter,
  ScanMRZ,
  ScanEHIC,
  ScanIdCard,
  ReadPassportNFC,
  LicenseInfo,
  OcrConfigs,
  LearnMore,
  LicensePlateScannerML,
  LicensePlateScannerClassic,
  TextDataScanner,
  BarcodeCameraViewComponent,
}
export class Examples {
  public static list = [
    {
      title: 'DOCUMENT SCANNER',
      data: [
        { id: FeatureId.DocumentScanner, title: 'Scan Document' },
        {
          id: FeatureId.DetectDocumentFromPage,
          title: 'Import Image & Detect Document',
        },
        {
          id: FeatureId.DetectDocumentFromImage,
          title: 'Import Image & Detect Document (JSON)',
        },
        {
          id: FeatureId.ExtractPagesFromPdf,
          title: 'Extract pages from PDF',
        },
        {
          id: FeatureId.ExtractImagesFromPdf,
          title: 'Extract images from PDF',
        },
        { id: FeatureId.ViewPages, title: 'View Image Results' },
      ],
    },
    {
      title: 'BARCODE DETECTOR',
      data: [
        { id: FeatureId.ScanBarcodes, title: 'Scan QR-/Barcode' },
        { id: FeatureId.ScanBatchBarcodes, title: 'Scan Multiple QR-/Barcode' },
        {
          id: FeatureId.DetectBarcodesOnStillImage,
          title: 'Import Image & Detect Barcodes',
        },
        {
          id: FeatureId.DetectBarcodesOnStillImages,
          title: 'Import Multiple Images & Detect Barcodes',
        },
        {
          id: FeatureId.BarcodeFormatsFilter,
          title: 'Set Barcode Formats Filter',
        },
        {
          id: FeatureId.BarcodeDocumentFormatsFilter,
          title: 'Set Barcode Document Formats Filter',
        },
      ],
    },
    {
      title: 'DATA DETECTORS',
      data: [
        { id: FeatureId.ScanMRZ, title: 'Scan MRZ on ID Card' },
        { id: FeatureId.ScanEHIC, title: 'Scan Health Insurance Card' },
        { id: FeatureId.ScanIdCard, title: 'Scan Id Card' },
        { id: FeatureId.ReadPassportNFC, title: 'Read Passport NFC' },
        {
          id: FeatureId.LicensePlateScannerML,
          title: 'Scan Vehicle License Plate (ML Based)',
        },
        {
          id: FeatureId.LicensePlateScannerClassic,
          title: 'Scan Vehicle License Plate (Classic)',
        },
        { id: FeatureId.TextDataScanner, title: 'Text Data Scanner' },
      ],
    },
    {
      title: 'MISCELLANEOUS',
      data: [
        { id: FeatureId.LicenseInfo, title: 'View License Info' },
        { id: FeatureId.OcrConfigs, title: 'View OCR Configs' },
        {
          id: FeatureId.BarcodeCameraViewComponent,
          title: 'Barcode Camera View (EXPERIMENTAL)',
        },
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
            },
          }),
        },
      ],
    },
  ];
}
