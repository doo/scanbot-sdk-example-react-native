import {
  DocumentScanningFlow,
  startDocumentScanner,
  PageSnapFunnelAnimation,
} from 'react-native-scanbot-sdk/ui_v2';

async function documentScanner() {
  const configuration = new DocumentScanningFlow();

  const cameraScreenConfiguration = configuration.screens.camera;

  // Equivalent to ignoreBadAspectRatio: true
  cameraScreenConfiguration.cameraConfiguration.ignoreBadAspectRatio = true;

  // Equivalent to autoSnappingSensitivity: 0.67
  cameraScreenConfiguration.cameraConfiguration.autoSnappingSensitivity = 0.67;

  // Ready-to-Use UI v2 contains an acknowledgment screen to
  // verify the captured document with the built-in Document Quality Analyzer.
  // You can still disable this step:
  cameraScreenConfiguration.acknowledgement.acknowledgementMode = 'NONE';

  // When you disable the acknowledgment screen, you can enable the capture feedback,
  // there are different options available, for example you can display a checkmark animation:
  cameraScreenConfiguration.captureFeedback.snapFeedbackMode =
    new PageSnapFunnelAnimation();

  // You may hide the import button in the camera screen, if you don't need it:
  cameraScreenConfiguration.bottomBar.importButton.visible = false;

  // Equivalent to bottomBarBackgroundColor: '#ffffff', but not recommended:
  configuration.appearance.bottomBarBackgroundColor = '#ffffff';

  // However, now all the colors can be conveniently set using the Palette object:
  const palette = configuration.palette;
  palette.sbColorPrimary = '#ffffff';
  palette.sbColorOnPrimary = '#ffffff';
  // ..

  // Now all the text resources are in the localization object
  const localization = configuration.localization;
  // Equivalent to textHintOK: "Don't move.\nCapturing document...",
  localization.cameraUserGuidanceReadyToCapture =
    "Don't move. Capturing document...";

  // Ready-to-Use UI v2 contains a review screen, you can disable it:
  configuration.screens.review.enabled = false;

  // Multi Page button is always hidden in RTU v2
  // Therefore multiPageButtonHidden: true is not available

  // Equivalent to multiPageEnabled: false
  configuration.outputSettings.pagesScanLimit = 1;

  const documentData = await startDocumentScanner(configuration);
}
