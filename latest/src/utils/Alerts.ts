import {Alert} from 'react-native';

export function errorMessageAlert(message: string) {
  Alert.alert(
    'An unexpected error has occurred',
    message,
    [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}
