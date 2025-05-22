import {
  MrzScannerScreenConfiguration,
  startMRZScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
    /** Start the MRZ Scanner **/
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
      // mrzScannerResult.data.rawMRZ
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
