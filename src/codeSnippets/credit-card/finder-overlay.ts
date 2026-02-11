import {
  CreditCardScannerScreenConfiguration,
  FinderCorneredStyle,
  ScanbotCreditCard,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
    /** Show the example overlay  */
    configuration.exampleOverlayVisible = true;
    //** Configure the view finder style */
    configuration.viewFinder.style = new FinderCorneredStyle({
      cornerRadius: 8,
      strokeWidth: 2,
    });
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
