import {
  startTextPatternScanner,
  StyledText,
  TextPatternIntroCustomImage,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
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
    introductionConfiguration.image = new TextPatternIntroCustomImage({
      uri: 'imageUri',
    });
    /** Configure the text. **/
    configuration.introScreen.explanation.color = '#000000';
    configuration.introScreen.explanation.text =
      "To scan a single line of text, please hold your device so that the camera viewfinder clearly captures the text you want to scan. Please ensure the text is properly aligned. Once the scan is complete, the text will be automatically extracted.\n\nPress 'Start Scanning' to begin.";
    /** Configure the done button. E.g., the text or the background color. **/
    configuration.introScreen.doneButton.text = 'Start Scanning';
    configuration.introScreen.doneButton.background.fillColor = '#C8193C';
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await startTextPatternScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
      // textPatternResult.data.rawText;
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
