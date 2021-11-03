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
      if (DocumentPicker.isCancel(err)) {
        return { status: 'CANCELED' };
      } else {
        return { status: 'ERROR', error: err };
      }
    }
  }
}
