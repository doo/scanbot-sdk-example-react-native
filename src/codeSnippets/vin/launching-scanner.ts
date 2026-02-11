import {
  ScanbotVin,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new VinScannerScreenConfiguration();
    /** Start the VIN Scanner UI */
    const vinScannerResult = await ScanbotVin.startScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (vinScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
