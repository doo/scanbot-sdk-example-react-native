import {
  FinderCorneredStyle,
  FinderStrokedStyle,
  ScanbotTextPattern,
  TextPatternScannerScreenConfiguration,
} from 'react-native-scanbot-sdk';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new TextPatternScannerScreenConfiguration();
    /** Retrieve the instance of the viewFinder from the configuration object. */
    const viewFinder = configuration.viewFinder;
    /**
     * Configure the view finder.
     * Choose between cornered or stroked style.
     */
    viewFinder.style = new FinderStrokedStyle();
    /** For default cornered style. */
    viewFinder.style = new FinderCorneredStyle();
    /** You can also set each style's stroke width, stroke color or corner radius. */
    viewFinder.style = new FinderCorneredStyle({
      strokeWidth: 3,
      strokeColor: '#ff0000',
    });
    /** Start the Text Pattern Scanner **/
    const textPatternResult = await ScanbotTextPattern.startScanner(
      configuration,
    );
    /** Handle the result if the status is 'OK' */
    if (textPatternResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
