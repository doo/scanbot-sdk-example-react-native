import {StackNavigationProp} from '@react-navigation/stack';
import {
  BarcodeScannerResult,
  CheckRecognizerResult,
  GenericDocumentRecognizerResult,
  MedicalCertificateScannerResult,
  MrzScannerResult,
  Page,
} from 'react-native-scanbot-sdk';
import {BarcodeScannerResult as BarcodeScannerV2Result} from 'react-native-scanbot-sdk/ui_v2';
import {RouteProp} from '@react-navigation/native';

export enum Screens {
  HOME = 'home',
  BARCODE_CAMERA_VIEW = 'barcodeCameraView',
  BARCODE_FORMATS = 'barcodeFormats',
  BARCODE_DOCUMENT_FORMATS = 'barcodeDocumentFormats',
  CHECK_RECOGNIZER_RESULT = 'checkRecognizerResult',
  MRZ_RESULT = 'mrzResult',
  GENERIC_DOCUMENT_RESULT = 'genericDocumentResult',
  BARCODE_RESULT = 'barcodeResult',
  BARCODE_V2_RESULT = 'barcodeV2Result',
  MEDICAL_CERTIFICATE_RESULT = 'medicalCertificateResult',
  IMAGE_DETAILS = 'imageDetails',
  PAGE_RESULTS = 'imageResults',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot SDK Example React',
  [Screens.BARCODE_CAMERA_VIEW]: 'Barcode Camera View ',
  [Screens.BARCODE_RESULT]: 'Barcode Result',
  [Screens.BARCODE_V2_RESULT]: 'Barcode Result',
  [Screens.BARCODE_FORMATS]: 'Barcode Formats',
  [Screens.BARCODE_DOCUMENT_FORMATS]: 'Barcode Document Formats',
  [Screens.CHECK_RECOGNIZER_RESULT]: 'Check Recognizer Result',
  [Screens.MRZ_RESULT]: 'MRZ Result',
  [Screens.GENERIC_DOCUMENT_RESULT]: 'Generic Document Recognizer Result',
  [Screens.MEDICAL_CERTIFICATE_RESULT]: 'Medical Certificate Result',
  [Screens.IMAGE_DETAILS]: 'Image Details',
  [Screens.PAGE_RESULTS]: 'Page Results',
};

export type PrimaryRoutesParamList = {
  [Screens.HOME]: undefined;
  [Screens.BARCODE_CAMERA_VIEW]: undefined;
  [Screens.BARCODE_RESULT]: BarcodeScannerResult;
  [Screens.BARCODE_V2_RESULT]: BarcodeScannerV2Result;
  [Screens.BARCODE_FORMATS]: undefined;
  [Screens.BARCODE_DOCUMENT_FORMATS]: undefined;
  [Screens.CHECK_RECOGNIZER_RESULT]: CheckRecognizerResult;
  [Screens.MRZ_RESULT]: MrzScannerResult;
  [Screens.GENERIC_DOCUMENT_RESULT]: GenericDocumentRecognizerResult;
  [Screens.MEDICAL_CERTIFICATE_RESULT]: MedicalCertificateScannerResult;
  [Screens.IMAGE_DETAILS]: Page;
  [Screens.PAGE_RESULTS]: undefined;
};

export type PrimaryRouteNavigationProp = StackNavigationProp<
  PrimaryRoutesParamList,
  keyof PrimaryRoutesParamList
>;

export type ImageDetailScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.IMAGE_DETAILS
>;

export type CheckRecognizerResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.CHECK_RECOGNIZER_RESULT
>;

export type MrzResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.MRZ_RESULT
>;

export type MedicalCertificateResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.MEDICAL_CERTIFICATE_RESULT
>;

export type GenericDocumentResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.GENERIC_DOCUMENT_RESULT
>;

export type BarcodeResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.BARCODE_RESULT
>;

export type BarcodeV2ResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.BARCODE_V2_RESULT
>;
