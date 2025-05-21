import {
  errorCodes,
  isErrorWithCode,
  pick,
  types,
} from '@react-native-documents/picker';
import {infoMessageAlert} from './Alerts.ts';

/**
 * Select a local PDF file and retrieve the file's URI.
 * @return {Promise<string|undefined>} URI of the selected PDF if the operation is successful or undefined otherwise
 */

export async function selectPDFFileUri(): Promise<string | undefined> {
  try {
    const [pdfFile] = await pick({
      mode: 'import',
      type: types.pdf,
      allowedExtensions: false,
      allowMultiSelection: false,
    });

    return pdfFile.uri;
  } catch (e) {
    if (isErrorWithCode(e)) {
      switch (e.code) {
        case errorCodes.UNABLE_TO_OPEN_FILE_TYPE: {
          infoMessageAlert('Unable to open file');
          break;
        }
        case errorCodes.IN_PROGRESS: {
          infoMessageAlert(e.message);
          break;
        }
      }
    }

    return undefined;
  }
}
