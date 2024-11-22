import {
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';
import {
  PageSnapCheckMarkAnimation,
  PageSnapFunnelAnimation,
} from 'react-native-scanbot-sdk/src/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set the limit for the number of pages you want to scan. */
    configuration.outputSettings.pagesScanLimit = 30;
    /** Retrieve the camera screen configuration. */
    const cameraScreenConfig = configuration.screens.camera;
    /**
     *  Configure the user guidance.
     *  Configure the top user guidance.
     */
    cameraScreenConfig.topUserGuidance.visible = true;
    cameraScreenConfig.topUserGuidance.background.fillColor = '#4A000000';
    cameraScreenConfig.topUserGuidance.title.text = 'Scan your document';
    /** Configure the bottom user guidance. */
    cameraScreenConfig.userGuidance.visibility = 'ENABLED';
    cameraScreenConfig.userGuidance.background.fillColor = '#4A000000';
    cameraScreenConfig.userGuidance.title.text =
      'Please hold your device over a document';
    /** Configure the scanning assistance overlay. */
    cameraScreenConfig.scanAssistanceOverlay.visible = true;
    cameraScreenConfig.scanAssistanceOverlay.backgroundColor = '#4A000000';
    cameraScreenConfig.scanAssistanceOverlay.foregroundColor = '#FFFFFF';
    /** Configure the title of the bottom user guidance for different states. */
    cameraScreenConfig.userGuidance.statesTitles.noDocumentFound =
      'No Document';
    cameraScreenConfig.userGuidance.statesTitles.badAspectRatio =
      'Bad Aspect Ratio';
    cameraScreenConfig.userGuidance.statesTitles.badAngles = 'Bad angle';
    cameraScreenConfig.userGuidance.statesTitles.textHintOffCenter =
      'The document is off center';
    cameraScreenConfig.userGuidance.statesTitles.tooSmall =
      'The document is too small';
    cameraScreenConfig.userGuidance.statesTitles.tooNoisy =
      'The document is too noisy';
    cameraScreenConfig.userGuidance.statesTitles.tooDark = 'Need more light';
    cameraScreenConfig.userGuidance.statesTitles.energySaveMode =
      'Energy save mode is active';
    cameraScreenConfig.userGuidance.statesTitles.readyToCapture =
      'Ready to capture';
    cameraScreenConfig.userGuidance.statesTitles.capturing =
      'Capturing the document';
    /** The title of the user guidance when the document ready to be captured in manual mode. */
    cameraScreenConfig.userGuidance.statesTitles.captureManual =
      'The document is ready to be captured';
    /**
     * Configure the bottom bar and the bottom bar buttons.
     * Set the background color of the bottom bar.
     */
    configuration.appearance.bottomBarBackgroundColor = '#C8193C';
    /** Import button is used to import image from the gallery. */
    cameraScreenConfig.bottomBar.importButton.visible = true;
    cameraScreenConfig.bottomBar.importButton.title.visible = true;
    cameraScreenConfig.bottomBar.importButton.title.text = 'Import';
    /** Configure the auto/manual snap button. */
    cameraScreenConfig.bottomBar.autoSnappingModeButton.title.visible = true;
    cameraScreenConfig.bottomBar.autoSnappingModeButton.title.text = 'Auto';
    cameraScreenConfig.bottomBar.manualSnappingModeButton.title.visible = true;
    cameraScreenConfig.bottomBar.manualSnappingModeButton.title.text = 'Manual';
    /** Configure the torch off/on button. */
    cameraScreenConfig.bottomBar.torchOnButton.title.visible = true;
    cameraScreenConfig.bottomBar.torchOnButton.title.text = 'On';
    cameraScreenConfig.bottomBar.torchOffButton.title.visible = true;
    cameraScreenConfig.bottomBar.torchOffButton.title.text = 'Off';
    /** Configure the camera blink behavior when an image is captured. */
    cameraScreenConfig.captureFeedback.cameraBlinkEnabled = true;
    /**
     * Configure the animation mode. You can choose between a checkmark animation or a document funnel animation.
     * Configure the checkmark animation. You can use the default colors or set your own desired colors for the checkmark.
     */
    cameraScreenConfig.captureFeedback.snapFeedbackMode =
      new PageSnapCheckMarkAnimation();
    /** Or you can choose the funnel animation. */
    cameraScreenConfig.captureFeedback.snapFeedbackMode =
      new PageSnapFunnelAnimation();
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
