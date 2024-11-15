import {
  AspectRatio,
  DocumentScanningFlow,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';
import {NoButtonMode} from 'react-native-scanbot-sdk/src/ui_v2/document/CameraScreenConfiguration.ts';
import {PageSnapFunnelAnimation} from 'react-native-scanbot-sdk/src/ui_v2';

async function finderDocumentScanner() {
  const configuration = new DocumentScanningFlow();

  //Equivalent to topBarBackgroundColor: '#ffffff', using palete
  const palette = configuration.palette;
  palette.sbColorPrimary = '#ffffff';
  palette.sbColorOnPrimary = '#0027ff';
  // ..

  const cameraScreenConfiguration = configuration.screens.camera;

  const viewFinder = cameraScreenConfiguration.viewFinder;
  viewFinder.visible = true;
  viewFinder.aspectRatio = new AspectRatio({width: 3, height: 4});

  const bottomBar = cameraScreenConfiguration.bottomBar;
  bottomBar.previewButton = new NoButtonMode({});
  bottomBar.autoSnappingModeButton.visible = false;
  bottomBar.importButton.visible = false;

  cameraScreenConfiguration.acknowledgement.acknowledgementMode = 'NONE';
  cameraScreenConfiguration.captureFeedback.snapFeedbackMode =
    new PageSnapFunnelAnimation();

  configuration.screens.review.enabled = false;
  configuration.outputSettings.pagesScanLimit = 1;

  const documentData = await startDocumentScanner(configuration);
}
