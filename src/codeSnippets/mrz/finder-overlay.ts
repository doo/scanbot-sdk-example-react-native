import {
  FinderCorneredStyle,
  MrzScannerScreenConfiguration,
  NoLayoutPreset,
  startMRZScanner,
  ThreeLineMrzFinderLayoutPreset,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new MrzScannerScreenConfiguration();
    /** Hide the example overlay  */
    configuration.mrzExampleOverlay = new NoLayoutPreset();
    /** Configure the example overlay  */
    configuration.mrzExampleOverlay = new ThreeLineMrzFinderLayoutPreset();
    /** Set the example overlay text  */
    configuration.mrzExampleOverlay.mrzTextLine1 =
      'I<USA2342353464<<<<<<<<<<<<<<<';
    configuration.mrzExampleOverlay.mrzTextLine2 =
      '9602300M2904076USA<<<<<<<<<<<2';
    configuration.mrzExampleOverlay.mrzTextLine3 =
      'SMITH<<JACK<<<<<<<<<<<<<<<<<<<';
    //** Configure the view finder style */
    configuration.viewFinder.style = new FinderCorneredStyle({
      cornerRadius: 8,
      strokeWidth: 2,
    });
    /** Start the MRZ Scanner UI */
    const mrzScannerResult = await startMRZScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (mrzScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
