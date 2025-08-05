import {
  startVINScanner,
  StyledText,
  VinIntroCustomImage,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new VinScannerScreenConfiguration();
    /** Retrieve the instance of the introduction configuration from the main configuration object. */
    const introductionConfiguration = configuration.introScreen;
    /** Show the introduction screen automatically when the screen appears. */
    introductionConfiguration.showAutomatically = true;
    /** Configure the title for the intro screen. */
    introductionConfiguration.title = new StyledText({
      color: '#000000',
      text: 'VIN Scanner',
    });
    /** Configure the image for the introduction screen. */
    introductionConfiguration.image = new VinIntroCustomImage({
      uri: 'imageUri',
    });
    /** Configure the text. **/
    configuration.introScreen.explanation.color = '#000000';
    configuration.introScreen.explanation.text =
      'Quickly and securely scan the VIN by holding your device over the vehicle identification number or vehicle identification barcode' +
      '\\nThe scanner will guide you to the optimal scanning position.' +
      'Once the scan is complete, your VIN details will automatically be extracted and processed.';
    /** Configure the done button. E.g., the text or the background color. **/
    configuration.introScreen.doneButton.text = 'Start Scanning';
    configuration.introScreen.doneButton.background.fillColor = '#C8193C';
    /** Start the VIN Scanner UI */
    const vinScannerResult = await startVINScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (vinScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
