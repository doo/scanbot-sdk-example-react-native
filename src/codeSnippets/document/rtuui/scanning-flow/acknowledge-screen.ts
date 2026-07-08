import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    const acknowledgementScreenConfig =
      configuration.screens.camera.acknowledgement;
    /**
     * Set the acknowledgment mode
     * Modes:
     *  - UNACCEPTABLE_QUALITY: The acknowledgment screen will only be shown when the quality of a scanned page is unacceptable.
     *                          The quality threshold is determined by the document quality analyzer parameters.
     *  - ALWAYS: The acknowledgment screen will always be shown after each snap, regardless of the scanned page's quality.
     *  - NONE: The acknowledgment screen will be disabled, in effect never shown.
     */
    acknowledgementScreenConfig.acknowledgementMode = 'UNACCEPTABLE_QUALITY';
    /** Set the background color for the acknowledgment screen. */
    acknowledgementScreenConfig.backgroundColor = '#EFEFEF';
    /**
     * You can also configure the buttons in the bottom bar of the acknowledgment screen.
     * e.g To force the user to retake, if the captured document is not OK.
     */
    acknowledgementScreenConfig.bottomBar.retakeButton.visible = false;
    /** Hide the titles of the buttons. */
    acknowledgementScreenConfig.bottomBar.acceptWhenAcceptableButton.title.visible =
      false;
    acknowledgementScreenConfig.bottomBar.proceedAnywayButton.unacceptableQuality.title.visible =
      false;
    acknowledgementScreenConfig.bottomBar.proceedAnywayButton.documentNotFound.title.visible =
      false;
    acknowledgementScreenConfig.bottomBar.proceedAnywayButton.uncertainQuality.title.visible =
      false;
    acknowledgementScreenConfig.bottomBar.retakeButton.title.visible = false;
    /** Configure the acknowledgment screen's hint message which is shown. */
    acknowledgementScreenConfig.documentNotFoundWarning.title.text =
      'No document found';
    acknowledgementScreenConfig.unacceptableQualityWarning.title.text =
      'Document quality is unacceptable';
    acknowledgementScreenConfig.uncertainQualityWarning.title.text =
      'Document quality is unacceptable';
    /** Start the Document Scanner UI */
    const documentResult = await ScanbotDocument.startScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
