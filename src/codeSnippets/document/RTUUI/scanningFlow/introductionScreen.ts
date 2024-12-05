import {
  CheckIntroImage,
  DocumentScanningFlow,
  IntroListEntry,
  ReceiptsIntroImage,
  startDocumentScanner,
  StyledText,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Retrieve the instance of the introduction configuration from the main configuration object. */
    const introductionConfiguration = configuration.screens.camera.introduction;
    /** Show the introduction screen automatically when the screen appears. */
    introductionConfiguration.showAutomatically = true;
    /** Create a new introduction item. */
    const firstExampleEntry = new IntroListEntry();
    /** Configure the introduction image to be shown. */
    firstExampleEntry.image = new ReceiptsIntroImage();
    /** Configure the text. */
    firstExampleEntry.text = new StyledText({
      text: 'Some text explaining how to scan a receipt',
      color: '#000000',
    });
    /** Create a second introduction item. */
    const secondExampleEntry = new IntroListEntry();
    /** Configure the introduction image to be shown. */
    secondExampleEntry.image = new CheckIntroImage();
    /** Configure the text. */
    secondExampleEntry.text = new StyledText({
      text: 'Some text explaining how to scan a check',
      color: '#000000',
    });
    /** Set the items into the configuration. */
    introductionConfiguration.items = [firstExampleEntry, secondExampleEntry];
    /** Set a screen title. */
    introductionConfiguration.title = new StyledText({
      text: 'Introduction',
      color: '#000000',
    });
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
