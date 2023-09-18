import {createContext, Dispatch, SetStateAction, useState} from 'react';
import {
  CheckRecognizerResult,
  GenericDocumentRecognizerResult,
  MedicalCertificateScannerResult,
} from 'react-native-scanbot-sdk';

interface LastResultContextValue {
  lastCheckRecognizerResult: CheckRecognizerResult | undefined;
  lastMedicalCertificateResult: MedicalCertificateScannerResult | undefined;
  lastGenericDocumentResult: GenericDocumentRecognizerResult | undefined;
  setLastCheckRecognizerResult: Dispatch<
    SetStateAction<CheckRecognizerResult | undefined>
  >;
  setLastMedicalCertificate: Dispatch<
    SetStateAction<MedicalCertificateScannerResult | undefined>
  >;
  setLastGenericDocumentResult: Dispatch<
    SetStateAction<GenericDocumentRecognizerResult | undefined>
  >;
}

export const LastResultContext = createContext<LastResultContextValue>({
  lastCheckRecognizerResult: undefined,
  lastGenericDocumentResult: undefined,
  lastMedicalCertificateResult: undefined,
  setLastCheckRecognizerResult(
    _value:
      | ((
          prevState: CheckRecognizerResult | undefined,
        ) => CheckRecognizerResult | undefined)
      | CheckRecognizerResult
      | undefined,
  ): void {},
  setLastGenericDocumentResult(
    _value:
      | ((
          prevState: GenericDocumentRecognizerResult | undefined,
        ) => GenericDocumentRecognizerResult | undefined)
      | GenericDocumentRecognizerResult
      | undefined,
  ): void {},
  setLastMedicalCertificate(
    _value:
      | ((
          prevState: MedicalCertificateScannerResult | undefined,
        ) => MedicalCertificateScannerResult | undefined)
      | MedicalCertificateScannerResult
      | undefined,
  ): void {},
});

export function useLastResult() {
  const [lastCheckRecognizerResult, setLastCheckRecognizerResult] =
    useState<CheckRecognizerResult>();
  const [lastMedicalCertificateResult, setLastMedicalCertificate] =
    useState<MedicalCertificateScannerResult>();
  const [lastGenericDocumentResult, setLastGenericDocumentResult] =
    useState<GenericDocumentRecognizerResult>();

  return {
    lastCheckRecognizerResult,
    lastMedicalCertificateResult,
    lastGenericDocumentResult,
    setLastCheckRecognizerResult,
    setLastMedicalCertificate,
    setLastGenericDocumentResult,
  };
}
