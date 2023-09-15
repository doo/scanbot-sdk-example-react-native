import {StackNavigationProp} from '@react-navigation/stack';

export enum Screens {
  HOME = 'home',
  BARCODE_CAMERA_VIEW = 'barcodeCameraView',
  BARCODE_FORMATS = 'barcodeFormats',
  BARCODE_DOCUMENT_FORMATS = 'barcodeDocumentFormats',
  CHECK_RECOGNIZER_RESULT = 'checkRecognizerResult',
  GENERIC_DOCUMENT_RESULT = 'genericDocumentResult',
  MEDICAL_CERTIFICATE_RESULT = 'medicalCertificateResult',
  IMAGE_DETAILS = 'imageDetails',
  IMAGE_RESULTS = 'imageResults',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot SDK Example React',
  [Screens.BARCODE_CAMERA_VIEW]: 'Barcode Camera View ',
  [Screens.BARCODE_FORMATS]: 'Barcode Document Formats',
  [Screens.BARCODE_DOCUMENT_FORMATS]: 'Barcode Formats',
  [Screens.CHECK_RECOGNIZER_RESULT]: 'Check Recognizer Result',
  [Screens.GENERIC_DOCUMENT_RESULT]: 'Check Recognizer Result',
  [Screens.MEDICAL_CERTIFICATE_RESULT]: 'Medical Certificate Result',
  [Screens.IMAGE_DETAILS]: 'Image Details',
  [Screens.IMAGE_RESULTS]: 'Image Results',
};

export type PrimaryRoutesParamList = {
  [Screens.HOME]: undefined;
  [Screens.BARCODE_CAMERA_VIEW]: undefined;
  [Screens.BARCODE_FORMATS]: undefined;
  [Screens.BARCODE_DOCUMENT_FORMATS]: undefined;
  [Screens.CHECK_RECOGNIZER_RESULT]: undefined;
  [Screens.GENERIC_DOCUMENT_RESULT]: undefined;
  [Screens.MEDICAL_CERTIFICATE_RESULT]: undefined;
  [Screens.IMAGE_DETAILS]: undefined;
  [Screens.IMAGE_RESULTS]: undefined;
};

export type PrimaryRouteNavigationProp = StackNavigationProp<
  PrimaryRoutesParamList,
  keyof PrimaryRoutesParamList
>;
