import {
  CreditCardIntroCustomImage,
  CreditCardScannerScreenConfiguration,
  startCreditCardScanner,
  StyledText,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new CreditCardScannerScreenConfiguration();
    /** Retrieve the instance of the introduction configuration from the main configuration object. */
    const introductionConfiguration = configuration.introScreen;
    /** Show the introduction screen automatically when the screen appears. */
    introductionConfiguration.showAutomatically = true;
    /** Configure the title for the intro screen. */
    introductionConfiguration.title = new StyledText({
      color: '#000000',
      text: 'Text Pattern Scanner',
    });
    /** Configure the image for the introduction screen. */
    introductionConfiguration.image = new CreditCardIntroCustomImage({
      uri: 'imageUri',
    });
    /** Configure the text. **/
    configuration.introScreen.explanation.color = '#000000';
    configuration.introScreen.explanation.text =
      "To quickly and securely input your credit card details, please hold your device over the credit card, so that the camera aligns with the numbers on the front of the card.\n\nThe scanner will guide you to the optimal scanning position. Once the scan is complete, your card details will automatically be extracted and processed.\n\nPress 'Start Scanning' to begin.";
    /** Configure the done button. E.g., the text or the background color. **/
    configuration.introScreen.doneButton.text = 'Start Scanning';
    configuration.introScreen.doneButton.background.fillColor = '#C8193C';
    /** Start the Credit Card Scanner **/
    const creditCardResult = await startCreditCardScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (creditCardResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
