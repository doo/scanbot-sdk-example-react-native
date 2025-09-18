import {
  CheckScannerScreenConfiguration,
  startCheckScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CheckScannerScreenConfiguration();
    /** Configure the top bar mode */
    configuration.topBar.mode = 'GRADIENT';
    /** Configure the top bar status bar mode */
    configuration.topBar.statusBarMode = 'LIGHT';
    /** Configure the top bar background color */
    configuration.topBar.cancelButton.text = 'Cancel';
    configuration.topBar.cancelButton.foreground.color = '#C8193C';
    /** Start the Check Scanner UI */
    const checkScannerResult = await startCheckScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (checkScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
