import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
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
    /** Start the MRZ Scanner UI */
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
