import {
  ScanbotTextPattern,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await ScanbotTextPattern.startScanner(
      configuration,
    );
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
      // textPatternResult.data.rawText;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
