import {
  AspectRatio,
  DocumentScanningFlow,
  ScanbotDocument,
} from 'react-native-scanbot-sdk';

async function straighteningDocument() {
  try {
    /** Create the default configuration instance */
    const configuration = new DocumentScanningFlow();
    const straighteningParameters =
      configuration.outputSettings.straighteningParameters;

    /** Configure the straightening mode as needed **/
    straighteningParameters.straighteningMode = 'NONE';
    straighteningParameters.straighteningMode = 'STRAIGHTEN';

    /**
     * The straightening parameters can be customized to fit the expected aspect ratio of the document
     * to be straightened. This can help the straightening algorithm to achieve better results.
     */
    straighteningParameters.aspectRatios = [
      new AspectRatio({width: 5, height: 7}),
      new AspectRatio({width: 1, height: 1}),
      new AspectRatio({width: 16, height: 9}),
      new AspectRatio({width: 3, height: 4}),
    ];
    /** Start the Document Scanner UI */
    const documentResult = await ScanbotDocument.startScanner(configuration);
    /** Handle the document if the status is 'OK' */
    if (documentResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
