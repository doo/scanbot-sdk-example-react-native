import {useCallback} from 'react';
import {View} from 'react-native';
import {
  ComponentUnavailableError,
  DocumentDetectionResult,
  ImageRef,
  InvalidLicenseError,
  ProcessError,
  SBError,
  ScanbotDocumentScannerView,
  UnknownError,
} from 'react-native-scanbot-sdk';

function ScanbotDocumentScanner() {
  const onDocumentResult = useCallback(
    (
      _original: ImageRef,
      _documentImage?: ImageRef,
      _documentDetectionResult?: DocumentDetectionResult,
    ) => {
      // Handle the snapped document result here
    },
    [],
  );

  const onError = useCallback((error: SBError) => {
    // Handling errors using instanceof checks
    if (error instanceof UnknownError) {
      // An unknown or unexpected error occurred.
    } else if (error instanceof InvalidLicenseError) {
      // The SDK license is invalid or license requirements are not satisfied.
    } else if (error instanceof ComponentUnavailableError) {
      // A required SDK component is unavailable or not properly initialized.
    } else if (error instanceof ProcessError) {
      // A processing error occurred with additional context in error.code.
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScanbotDocumentScannerView
        onSnappedDocumentResult={onDocumentResult}
        onError={onError}
      />
    </View>
  );
}
