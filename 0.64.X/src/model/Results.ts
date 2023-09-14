import {
  CheckRecognizerResult,
  GenericDocumentRecognizerResult,
  MedicalCertificateScannerResult,
} from 'react-native-scanbot-sdk';

export class Results {
  public static lastCheckRecognizerResult?: CheckRecognizerResult;
  public static lastMedicalCertificate?: MedicalCertificateScannerResult;
  public static lastGenericDocumentResult?: GenericDocumentRecognizerResult;
}
