import {
  GenericDocumentRecognizerResult,
  MedicalCertificateScannerResult,
} from 'react-native-scanbot-sdk';

export class Results {
  public static lastMedicalCertificate?: MedicalCertificateScannerResult;
  public static lastGenericDocumentResult?: GenericDocumentRecognizerResult;
}
