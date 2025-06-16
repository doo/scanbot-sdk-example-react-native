import {
  startTextPatternScanner,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
    /** Retrieve the instance of the action bar from the configuration object. */
    const actionBar = configuration.actionBar;
    /** Configure the flash button */
    actionBar.flashButton.visible = true;
    actionBar.flashButton.backgroundColor = '#C8193C';
    actionBar.flashButton.foregroundColor = '#FFFFFF';
    /** Configure the zoom button */
    actionBar.zoomButton.visible = true;
    actionBar.zoomButton.backgroundColor = '#C8193C';
    actionBar.zoomButton.foregroundColor = '#FFFFFF';
    /** Hide the flip camera button */
    actionBar.flipCameraButton.visible = false;
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await startTextPatternScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
