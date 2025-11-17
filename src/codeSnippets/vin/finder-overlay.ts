import {
  FinderCorneredStyle,
  startVINScanner,
  VinScannerScreenConfiguration,
} from 'react-native-scanbot-sdk/ui_v2';
import {AspectRatio} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new VinScannerScreenConfiguration();
    /** Set the overlay color */
    configuration.viewFinder.overlayColor = '#C8193C';
    /** Configure the aspect ratio of the view finder */
    configuration.viewFinder.aspectRatio = new AspectRatio({
      width: 8,
      height: 6,
    });
    /** Configure the view finder style */
    configuration.viewFinder.style = new FinderCorneredStyle({
      cornerRadius: 8,
      strokeWidth: 2,
    });
    /** Start the VIN Scanner UI */
    const vinScannerResult = await startVINScanner(configuration);
    /** Handle the result if the status is 'OK' */
    if (vinScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
