import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {
  CheckScanningResult,
  CreditCardScanningStatus,
  DocumentDataExtractionResult,
  GenericDocument,
  MedicalCertificateScanningResult,
} from 'react-native-scanbot-sdk';

export enum Screens {
  HOME = 'home',
  CHECK_SCANNER_RESULT = 'checkScannerResult',
  MRZ_RESULT = 'mrzResult',
  DOCUMENT_DATA_EXTRACTOR_RESULT = 'documentDataExtractorResult',
  MEDICAL_CERTIFICATE_RESULT = 'medicalCertificateResult',
  PLAIN_DATA_RESULT = 'plainDataResult',
  DOCUMENT_RESULT = 'documentResult',
  DOCUMENT_PAGE_RESULT = 'documentPageResult',
  CREDIT_CARD_RESULT = 'creditCardResult',
  DOCUMENT_SCANNER_VIEW = 'documentScannerView',
}

export const ScreenTitles: Record<Screens, string> = {
  [Screens.HOME]: 'Scanbot SDK Example React',
  [Screens.CHECK_SCANNER_RESULT]: 'Check Scanner Result',
  [Screens.MRZ_RESULT]: 'MRZ Result',
  [Screens.DOCUMENT_DATA_EXTRACTOR_RESULT]: 'Document Data Extractor Result',
  [Screens.MEDICAL_CERTIFICATE_RESULT]: 'Medical Certificate Result',
  [Screens.PLAIN_DATA_RESULT]: 'Result',
  [Screens.DOCUMENT_RESULT]: 'Document',
  [Screens.DOCUMENT_PAGE_RESULT]: 'Document Page',
  [Screens.CREDIT_CARD_RESULT]: 'Credit Card Result',
  [Screens.DOCUMENT_SCANNER_VIEW]: 'Document Scanner View',
};

export type PrimaryRoutesParamList = {
  [Screens.HOME]: undefined;
  [Screens.CHECK_SCANNER_RESULT]: {
    check: Awaited<ReturnType<CheckScanningResult['serialize']>>;
  };
  [Screens.DOCUMENT_DATA_EXTRACTOR_RESULT]: {
    documents: Awaited<ReturnType<DocumentDataExtractionResult['serialize']>>[];
  };
  [Screens.MEDICAL_CERTIFICATE_RESULT]: {
    certificate: Awaited<
      ReturnType<MedicalCertificateScanningResult['serialize']>
    >;
  };
  [Screens.MRZ_RESULT]: {
    mrzDocument: GenericDocument | null;
    rawMRZ: string;
  };
  [Screens.CREDIT_CARD_RESULT]: {
    creditCardDocument: GenericDocument | null;
    recognitionStatus: CreditCardScanningStatus;
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

export type DocumentDataExtractionResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.DOCUMENT_DATA_EXTRACTOR_RESULT
>;

export type PlainDataResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.PLAIN_DATA_RESULT
>;

export type DocumentPageResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.DOCUMENT_PAGE_RESULT
>;

export type CreditCardResultScreenRouteProp = RouteProp<
  PrimaryRoutesParamList,
  Screens.CREDIT_CARD_RESULT
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
