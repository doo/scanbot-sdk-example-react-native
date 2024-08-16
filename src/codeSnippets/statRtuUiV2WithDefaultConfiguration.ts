/* eslint @typescript-eslint/no-unused-vars: 0 */
import {
  BarcodeScannerConfiguration,
  startBarcodeScanner,
} from 'react-native-scanbot-sdk/ui_v2';

async function statRtuUiV2WithDefaultConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // See further customization configs...

  const result = await startBarcodeScanner(config);
}
