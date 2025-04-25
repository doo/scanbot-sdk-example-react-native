import {
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
    /** Start the Credit Card Scanner **/
    const textPatternResult = await startCreditCardScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
