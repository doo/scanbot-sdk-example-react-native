import {
  startTextPatternScanner,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
    /** Configure the top bar mode */
    configuration.topBar.mode = 'GRADIENT';
    /** Configure the top bar status bar mode */
    configuration.topBar.statusBarMode = 'LIGHT';
    /** Configure the top bar background color */
    configuration.topBar.cancelButton.text = 'Cancel';
    configuration.topBar.cancelButton.foreground.color = '#C8193C';
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await startTextPatternScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
      // textPatternResult.data.rawText;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
