import {DocumentScanningFlow, ScanbotDocument} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set the acknowledgment mode */
    configuration.screens.camera.acknowledgement.acknowledgementMode = 'ALWAYS';
    /** Set the minimum acceptable document quality. */
    configuration.screens.camera.acknowledgement.minimumQuality = 'REASONABLE';
    /** Set the background color for the acknowledgment screen. */
    configuration.screens.camera.acknowledgement.backgroundColor = '#EFEFEF';
    /**
     * You can also configure the buttons in the bottom bar of the acknowledgment screen.
     * E.g., to force the user to retake if the captured document is not OK.
     */
    configuration.screens.camera.acknowledgement.bottomBar.acceptWhenNotOkButton.visible =
      false;
    /** Hide the titles of the buttons. */
    configuration.screens.camera.acknowledgement.bottomBar.acceptWhenNotOkButton.title.visible =
      false;
    configuration.screens.camera.acknowledgement.bottomBar.acceptWhenOkButton.title.visible =
      false;
    configuration.screens.camera.acknowledgement.bottomBar.retakeButton.title.visible =
      false;
    /** Configure the acknowledgment screen's hint message which is shown if the least acceptable quality is not met. */
    configuration.screens.camera.acknowledgement.badImageHint.visible = true;
    /** Start the Document Scanner UI */
    const documentResult = await ScanbotDocument.startScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
