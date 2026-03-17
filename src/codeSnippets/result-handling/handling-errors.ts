import {
  ComponentUnavailableError,
  IllegalStateError,
  InvalidArgumentError,
  InvalidDataError,
  InvalidImageRefError,
  InvalidLicenseError,
  IOError,
  NullPointerError,
  OutOfMemoryError,
  ProcessError,
  SBError,
  SBErrorType,
  TimeoutError,
  UnknownError,
} from 'react-native-scanbot-sdk';

function handlingErrors(error: any) {
  // Handling errors using instanceof checks
  if (error instanceof SBError) {
    if (error instanceof UnknownError) {
      // An unknown or unexpected error occurred.
    } else if (error instanceof InvalidLicenseError) {
      // The SDK license is invalid or license requirements are not satisfied.
    } else if (error instanceof NullPointerError) {
      // A null pointer was encountered where a valid reference was expected.
    } else if (error instanceof InvalidArgumentError) {
      // An invalid argument was passed to an SDK function or method.
    } else if (error instanceof InvalidImageRefError) {
      // An invalid image reference was provided or the image data is corrupted.
    } else if (error instanceof ComponentUnavailableError) {
      // A required SDK component is unavailable or not properly initialized.
    } else if (error instanceof IllegalStateError) {
      // The SDK is in an illegal or inconsistent state for the requested operation.
    } else if (error instanceof IOError) {
      // An input/output error occurred during file or data operations.
    } else if (error instanceof InvalidDataError) {
      // The provided data is invalid, corrupted, or in an unexpected format.
    } else if (error instanceof OutOfMemoryError) {
      // The system ran out of memory during the operation.
    } else if (error instanceof TimeoutError) {
      // The operation timed out before completion.
    } else if (error instanceof ProcessError) {
      // A processing error occurred with additional context in error.code.
    } else {
      // Handle other error types if necessary.
    }
  }

  // OR, Handling errors using error type checks
  if (error instanceof SBError) {
    switch (error.type as SBErrorType) {
      case 'Unknown':
        // An unknown or unexpected error occurred.
        break;
      case 'InvalidLicense':
        // The SDK license is invalid or license requirements are not satisfied.
        break;
      case 'NullPointer':
        // A null pointer was encountered where a valid reference was expected.
        break;
      case 'InvalidArgument':
        // An invalid argument was passed to an SDK function or method.
        break;
      case 'InvalidImageRef':
        // An invalid image reference was provided or the image data is corrupted.
        break;
      case 'ComponentUnavailable':
        // A required SDK component is unavailable or not properly initialized.
        break;
      case 'IllegalState':
        // The SDK is in an illegal or inconsistent state for the requested operation.
        break;
      case 'IOError':
        // An input/output error occurred during file or data operations.
        break;
      case 'InvalidData':
        // The provided data is invalid, corrupted, or in an unexpected format.
        break;
      case 'OutOfMemory':
        // The system ran out of memory during the operation.
        break;
      case 'Timeout':
        // The operation timed out before completion.
        break;
      case 'ProcessError':
        // A processing error occurred with additional context in error.code.
        break;
      default: {
        // Handle other error types if necessary.
      }
    }
  }
}
