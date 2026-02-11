import {
  CheckScannerScreenConfiguration,
  ScanbotCheck,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CheckScannerScreenConfiguration();
    /** Start the Check Scanner UI */
    const checkScannerResult = await ScanbotCheck.startScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (checkScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
