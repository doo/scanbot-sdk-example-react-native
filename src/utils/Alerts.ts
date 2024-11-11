import {Alert} from 'react-native';

/**
 * An alert that displays an error message when an unexpected event occurs
 * @param message - the message being displayed in the alert
 */
export function errorMessageAlert(message: string | undefined) {
  Alert.alert(
    'An unexpected error has occurred',
    message ?? '',
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

/**
 * An alert that displays a result message when a successful action is complete
 * @param message - the message being displayed in the alert
 */
export function resultMessageAlert(message: string) {
  Alert.alert(
    'Result',
    message,
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}

/**
 * An alert that displays an info message
 * @param message - the message being displayed in the alert
 */
export function infoMessageAlert(message: string) {
  Alert.alert(
    'Info message',
    message,
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
    ],
    {
      cancelable: true,
    },
  );
}

export function removePageConfirmationAlert(onDelete: () => void) {
  Alert.alert(
    'Removing page,',
    'Are you sure you want to proceed?',
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        style: 'default',
        onPress: onDelete,
      },
    ],
    {
      cancelable: true,
    },
  );
}

export function deleteAllConfirmationAlert(onDelete: () => void) {
  Alert.alert(
    'Clearing storage',
    'Are you sure you want to proceed?',
    [
      {
        text: 'Close',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        style: 'default',
        onPress: onDelete,
      },
    ],
    {
      cancelable: true,
    },
  );
}
