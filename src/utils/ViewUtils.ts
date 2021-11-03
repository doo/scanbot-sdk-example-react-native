import { Alert } from 'react-native';

export class ViewUtils {
  public static showAlert(text: string) {
    // eslint-disable-next-line no-alert
    Alert.alert('Alert', text);
  }
}
