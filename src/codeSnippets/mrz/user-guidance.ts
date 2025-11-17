import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
    /** Retrieve the instance of the top user guidance from the configuration object. */
    const topUserGuidance = configuration.topUserGuidance;
    /** Show the top user guidance */
    topUserGuidance.visible = true;
    /** Customize the top user guidance */
    topUserGuidance.title.text = 'Customized title';
    topUserGuidance.title.color = '#000000';
    /** Customize the top user guidance background */
    topUserGuidance.background.fillColor = '#C8193C';
    /** Retrieve the instance of the finder user guidance from the configuration object. */
    const finderUserGuidance = configuration.finderViewUserGuidance;
    /** Show the finder user guidance */
    finderUserGuidance.visible = true;
    /** Customize the finder user guidance */
    finderUserGuidance.title.text = 'Customized title';
    finderUserGuidance.title.color = '#000000';
    /** Customize the finder user guidance background */
    finderUserGuidance.background.fillColor = '#C8193C';
    /** Start the MRZ Scanner UI */
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
