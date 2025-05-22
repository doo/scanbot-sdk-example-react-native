import {
  MrzIntroCustomImage,
  MrzScannerScreenConfiguration,
  startMRZScanner,
  StyledText,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
    /** Retrieve the instance of the introduction configuration from the main configuration object. */
    const introductionConfiguration = configuration.introScreen;
    /** Show the introduction screen automatically when the screen appears. */
    introductionConfiguration.showAutomatically = true;
    /** Configure the title for the intro screen. */
    introductionConfiguration.title = new StyledText({
      color: '#000000',
      text: 'MRZ Scanner',
    });
    /** Configure the image for the introduction screen. */
    introductionConfiguration.image = new MrzIntroCustomImage({
      uri: 'imageUri',
    });
    /** Configure the text. **/
    configuration.introScreen.explanation.color = '#000000';
    configuration.introScreen.explanation.text =
      "The Machine Readable Zone (MRZ) is a special code on your ID document (such as a passport or ID card) that contains your personal information in a machine-readable format.\n\nTo scan it, simply hold your camera over the document, so that it aligns with the MRZ section. Once scanned, the data will be automatically processed, and you will be directed to the results screen.\n\nPress 'Start Scanning' to begin.";
    /** Configure the done button. E.g., the text or the background color. **/
    configuration.introScreen.doneButton.text = 'Start Scanning';
    configuration.introScreen.doneButton.background.fillColor = '#C8193C';
    /** Start the MRZ Scanner UI */
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
