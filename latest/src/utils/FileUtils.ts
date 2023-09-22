import DocumentPicker from 'react-native-document-picker';
import {errorMessageAlert} from './Alerts';

/**
 * Select a local PDF file and retrieve the file's URI.
 * @return {Promise<string|undefined>} URI of the selected PDF if the operation is successful or undefined otherwise
 */

export async function selectPDFFileUri(): Promise<string | undefined> {
  return DocumentPicker.pickSingle({
    type: [DocumentPicker.types.pdf],
  })
    .then(result => result.uri)
    .catch(err => {
      if (
        !DocumentPicker.isCancel(err as Error & {code?: string | undefined})
      ) {
        errorMessageAlert(err.code ?? 'Error while using the document picker');
      }
      return undefined;
    });
}
