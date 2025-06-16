import {
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
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
    /** Start the Credit Card Scanner **/
    const creditCardResult = await startCreditCardScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (creditCardResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
