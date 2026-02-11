import {
  CreditCardScannerScreenConfiguration,
  ScanbotCreditCard,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
    /** Start the Credit Card Scanner **/
    const creditCardResult = await ScanbotCreditCard.startScanner(
      configuration,
    );
    /** Handle the result if the status is 'OK' */
    if (creditCardResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
