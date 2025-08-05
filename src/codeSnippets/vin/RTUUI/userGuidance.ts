import {
  startVINScanner,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new VinScannerScreenConfiguration();
    /** Retrieve the instance of the top user guidance from the configuration object. */
    const topUserGuidance = configuration.topUserGuidance;
    /** Show the top user guidance */
    topUserGuidance.visible = true;
    /** Customize the top user guidance */
    topUserGuidance.title.text = 'Customized title';
    topUserGuidance.title.color = '#000000';
    /** Customize the top user guidance background */
    topUserGuidance.background.fillColor = '#C8193C';
    /** Retrieve the instance of the scan status user guidance from the configuration object. */
    const finderViewUserGuidance = configuration.finderViewUserGuidance;
    /** Customize the finder user guidance */
    finderViewUserGuidance.title.text = 'Customized title';
    finderViewUserGuidance.title.color = '#000000';
    /** Customize the finder guidance background */
    finderViewUserGuidance.background.fillColor = '#C8193C';
    /** Start the VIN Scanner UI */
    const vinScannerResult = await startVINScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (vinScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
