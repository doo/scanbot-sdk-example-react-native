/* eslint @typescript-eslint/no-unused-vars: 0 */
import {BarcodeScannerConfiguration} from 'react-native-scanbot-sdk/ui_v2';

function rtuUiV2LocalizationConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Configure localization parameters.
  config.localization.barcodeInfoMappingErrorStateCancelButton =
    'Custom Cancel title';
  config.localization.cameraPermissionCloseButton = 'Custom Close title';
  // Configure other strings as needed.

  // Configure other parameters as needed.
}
