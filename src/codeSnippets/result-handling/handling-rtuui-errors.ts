import {
  DocumentScanningFlow,
  SBError,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

async function handlingRtuuiErrors() {
  try {
    const result = await ScanbotDocument.startScanner(
      new DocumentScanningFlow(),
    );

    if (result.status === 'CANCELED') {
      // The user canceled the scanning operation.
      // Handle cancellation logic here.
    }

    if (result.status === 'OK') {
      // Scanning completed successfully.
      const document = result.data;
    }
  } catch (error: any) {
    // Handle unexpected errors here.

    if (error instanceof SBError) {
      switch (error.type) {
        case 'Timeout':
          // The scanning operation timed out.
          break;
        case 'InvalidData':
          // The provided data is invalid, corrupted, or in an unexpected format.
          break;
        //....
      }
    }
  }
}
