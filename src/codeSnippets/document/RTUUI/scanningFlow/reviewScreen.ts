import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Retrieve the instance of the review configuration from the main configuration object. */
    const reviewScreenConfiguration = configuration.screens.review;
    /** Enable / Disable the review screen. */
    reviewScreenConfiguration.enabled = true;
    /** Hide the zoom button. */
    reviewScreenConfiguration.zoomButton.visible = false;
    /** Hide the add button. */
    reviewScreenConfiguration.bottomBar.addButton.visible = false;
    /** Retrieve the instance of the reorder pages configuration from the main configuration object. */
    const reorderScreenConfiguration = configuration.screens.reorderPages;
    /** Hide the guidance view. */
    reorderScreenConfiguration.guidance.visible = false;
    /** Set the title for the reorder screen. */
    reorderScreenConfiguration.topBarTitle.text = 'Reorder Pages Screen';
    /** Retrieve the instance of the cropping configuration from the main configuration object. */
    const croppingScreenConfiguration = configuration.screens.cropping;
    /** Hide the reset button. */
    croppingScreenConfiguration.bottomBar.resetButton.visible = false;
    /** Retrieve the retake button configuration from the main configuration object. */
    const retakeButtonConfiguration =
      configuration.screens.review.bottomBar.retakeButton;
    /** Show the retake button. */
    retakeButtonConfiguration.visible = true;
    /** Configure the retake title color. */
    retakeButtonConfiguration.title.color = '#ffffff';
    /** Apply the retake configuration button to the review bottom bar configuration. */
    configuration.screens.review.bottomBar.retakeButton =
      retakeButtonConfiguration;
    /** Apply the configurations. */
    configuration.screens.review = reviewScreenConfiguration;
    configuration.screens.reorderPages = reorderScreenConfiguration;
    configuration.screens.cropping = croppingScreenConfiguration;
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
