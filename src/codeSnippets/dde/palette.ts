import {
  DocumentDataExtractorScreenConfiguration,
  startDocumentDataExtractor,
} from 'react-native-scanbot-sdk/ui_v2';

async function startScanning() {
  try {
    /** Create an instance of the default configuration */
    const configuration = new DocumentDataExtractorScreenConfiguration();
    /** Configure the colors. */
    const palette = configuration.palette;
    /** The palette already has the default colors set, so you don't have to always set all the colors. */
    palette.sbColorPrimary = '#C8193C';
    palette.sbColorPrimaryDisabled = '#F5F5F5';
    palette.sbColorNegative = '#FF3737';
    palette.sbColorPositive = '#4EFFB4';
    palette.sbColorWarning = '#FFCE5C';
    palette.sbColorSecondary = '#FFEDEE';
    palette.sbColorSecondaryDisabled = '#F5F5F5';
    palette.sbColorOnPrimary = '#FFFFFF';
    palette.sbColorOnSecondary = '#C8193C';
    palette.sbColorSurface = '#FFFFFF';
    palette.sbColorOutline = '#EFEFEF';
    palette.sbColorOnSurfaceVariant = '#707070';
    palette.sbColorOnSurface = '#000000';
    palette.sbColorSurfaceLow = '#26000000';
    palette.sbColorSurfaceHigh = '#7A000000';
    palette.sbColorModalOverlay = '#A3000000';
    /** Start the DDE Scanner UI */
    const ddeScannerResult = await startDocumentDataExtractor(configuration);
    /** Handle the result if the status is 'OK' */
    if (ddeScannerResult.status === 'OK') {
    }
  } catch (e: any) {
    console.error(e.message);
  }
}
