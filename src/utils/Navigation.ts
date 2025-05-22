import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {
  CheckScanningResult,
  DeepPartial,
  DocumentDataExtractionResult,
  MedicalCertificateScanningResult,
  MrzScannerResult,
} from 'react-native-scanbot-sdk';

export enum Screens {
  HOME = 'home',
  CHECK_SCANNER_RESULT = 'checkScannerResult',
  MRZ_RESULT = 'mrzResult',
  GENERIC_DOCUMENT_RESULT = 'genericDocumentResult',
  MEDICAL_CERTIFICATE_RESULT = 'medicalCertificateResult',
  PLAIN_DATA_RESULT = 'plainDataResult',
  DOCUMENT_RESULT = 'documentResult',
  DOCUMENT_PAGE_RESULT = 'documentPageResult',
  DOCUMENT_SCANNER_VIEW = 'documentScannerView',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot SDK Example React',
  [Screens.CHECK_SCANNER_RESULT]: 'Check Scanner Result',
  [Screens.MRZ_RESULT]: 'MRZ Result',
  [Screens.GENERIC_DOCUMENT_RESULT]: 'Generic Document Recognizer Result',
  [Screens.MEDICAL_CERTIFICATE_RESULT]: 'Medical Certificate Result',
  [Screens.PLAIN_DATA_RESULT]: 'Result',
  [Screens.DOCUMENT_RESULT]: 'Document',
  [Screens.DOCUMENT_PAGE_RESULT]: 'Document Page',
  [Screens.DOCUMENT_SCANNER_VIEW]: 'Document Scanner View',
};

export type PrimaryRoutesParamList = {
  [Screens.HOME]: undefined;
  [Screens.CHECK_SCANNER_RESULT]: {
    check: ReturnType<CheckScanningResult['serialize']>;
  };
  [Screens.MRZ_RESULT]: {
    mrz: ReturnType<MrzScannerResult['serialize']>;
  };
  [Screens.GENERIC_DOCUMENT_RESULT]: {
    documents: DeepPartial<DocumentDataExtractionResult>[];
  };
  [Screens.MEDICAL_CERTIFICATE_RESULT]: {
    certificate: ReturnType<MedicalCertificateScanningResult['serialize']>;
  };
  [Screens.PLAIN_DATA_RESULT]: PlainDataResultParam;
  [Screens.DOCUMENT_RESULT]: undefined;
  [Screens.DOCUMENT_PAGE_RESULT]: {pageID: string};
  [Screens.DOCUMENT_SCANNER_VIEW]: undefined;
};

export type PrimaryRouteNavigationProp = NativeStackNavigationProp<
  PrimaryRoutesParamList,
  keyof PrimaryRoutesParamList
>;

export type CheckRecognizerResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.CHECK_SCANNER_RESULT
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
