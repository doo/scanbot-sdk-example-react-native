import {
  AspectRatio,
  DocumentScanningFlow,
  FinderCorneredStyle,
  startDocumentScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    /** Set the visibility of the view finder. */
    configuration.screens.camera.viewFinder.visible = true;
    /** Create the instance of the style, either `FinderCorneredStyle` or `FinderStrokedStyle`. */
    configuration.screens.camera.viewFinder.style = new FinderCorneredStyle({
      strokeColor: '#FFFFFFFF',
      strokeWidth: 3.0,
      cornerRadius: 10.0,
    });
    /** Set the desired aspect ratio of the view finder. */
    configuration.screens.camera.viewFinder.aspectRatio = new AspectRatio({
      width: 4.0,
      height: 5.0,
    });
    /** Set the overlay color. */
    configuration.screens.camera.viewFinder.overlayColor = '#26000000';
    /** Set the page limit. */
    configuration.outputSettings.pagesScanLimit = 1;
    /** Enable the tutorial screen. */
    configuration.screens.camera.introduction.showAutomatically = true;
    /** Disable the acknowledgment screen. */
    configuration.screens.camera.acknowledgement.acknowledgementMode = 'NONE';
    /** Disable the review screen. */
    configuration.screens.review.enabled = false;
    /** Start the Document Scanner UI */
    const documentResult = await startDocumentScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
