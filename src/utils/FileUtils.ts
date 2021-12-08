import DocumentPicker from 'react-native-document-picker';

export interface PickSingleFileResult {
  status: 'OK' | 'CANCELED' | 'ERROR';
  fileUrl?: string;
  error?: string;
}

export class FileUtils {
  static async pickPdf(): Promise<PickSingleFileResult> {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      return {
        status: 'OK',
        fileUrl: res.uri,
      };
    } catch (err) {
      const error = err as Error & {code?: string | undefined};
      if (DocumentPicker.isCancel(error)) {
        return {status: 'CANCELED'};
      } else {
        return {status: 'ERROR', error: error.code};
      }
    }
  }
}
