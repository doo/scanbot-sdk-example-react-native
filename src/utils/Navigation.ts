import {StackNavigationProp} from '@react-navigation/stack';
import {
  CheckRecognizerResult,
  GenericDocumentRecognizerResult,
  MedicalCertificateScannerResult,
  MrzScannerResult,
} from 'react-native-scanbot-sdk';
import {RouteProp} from '@react-navigation/native';

export enum Screens {
  HOME = 'home',
  CHECK_RECOGNIZER_RESULT = 'checkRecognizerResult',
  MRZ_RESULT = 'mrzResult',
  GENERIC_DOCUMENT_RESULT = 'genericDocumentResult',
  MEDICAL_CERTIFICATE_RESULT = 'medicalCertificateResult',
  PLAIN_DATA_RESULT = 'plainDataResult',
  DOCUMENT_RESULT = 'documentResult',
  DOCUMENT_PAGE_RESULT = 'documentPageResult',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot SDK Example React',
  [Screens.CHECK_RECOGNIZER_RESULT]: 'Check Recognizer Result',
  [Screens.MRZ_RESULT]: 'MRZ Result',
  [Screens.GENERIC_DOCUMENT_RESULT]: 'Generic Document Recognizer Result',
  [Screens.MEDICAL_CERTIFICATE_RESULT]: 'Medical Certificate Result',
  [Screens.PLAIN_DATA_RESULT]: 'Result',
  [Screens.DOCUMENT_RESULT]: 'Document',
  [Screens.DOCUMENT_PAGE_RESULT]: 'Document Page',
};

export type PrimaryRoutesParamList = {
  [Screens.HOME]: undefined;
  [Screens.CHECK_RECOGNIZER_RESULT]: CheckRecognizerResult;
  [Screens.MRZ_RESULT]: MrzScannerResult;
  [Screens.GENERIC_DOCUMENT_RESULT]: GenericDocumentRecognizerResult;
  [Screens.MEDICAL_CERTIFICATE_RESULT]: MedicalCertificateScannerResult;
  [Screens.PLAIN_DATA_RESULT]: PlainDataResultParam;
  [Screens.DOCUMENT_RESULT]: undefined;
  [Screens.DOCUMENT_PAGE_RESULT]: {pageID: string};
};

export type PrimaryRouteNavigationProp = StackNavigationProp<
  PrimaryRoutesParamList,
  keyof PrimaryRoutesParamList
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

export type PlainDataResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.PLAIN_DATA_RESULT
>;

export type DocumentPageResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.DOCUMENT_PAGE_RESULT
>;

export type PlainDataResultParam = {
  imageUris?: string[];
  data?:
    | Array<{
        key: string;
        value: string;
      }>
    | string;
};
