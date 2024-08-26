import {useCallback, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  checkLicense,
  errorMessageAlert,
  PrimaryRouteNavigationProp,
  Screens,
} from '@utils';
import {BarcodeDocumentFormatContext, BarcodeFormatsContext} from '@context';

import {
  BarcodeScannerConfiguration,
  ExpectedBarcode,
  FindAndPickScanningMode,
  startBarcodeScanner,
} from 'react-native-scanbot-sdk/ui_v2';

export function useFindAndPickScanning() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {acceptedBarcodeFormats} = useContext(BarcodeFormatsContext);
  const {acceptedBarcodeDocumentFormats} = useContext(
    BarcodeDocumentFormatContext,
  );

  return useCallback(async () => {
    try {
      /**
       * Check license status and return early
       * if the license is not valid
       */
      if (!(await checkLicense())) {
        return;
      }
      /**
       * Instantiate a configuration object of BarcodeScannerConfiguration and
       * start the barcode scanner with the configuration
       */
      const config = new BarcodeScannerConfiguration();

      // Initialize the use case for find and pick scanning.
      config.useCase = new FindAndPickScanningMode();

      // Set the sheet mode for the barcodes preview.
      config.useCase.sheet.mode = 'COLLAPSED_SHEET';

      // Enable the AR Overlay.
      config.useCase.arOverlay.visible = true;

      // Enable/Disable the automatic selection.
      config.useCase.arOverlay.automaticSelectionEnabled = false;

      // Set the height for the collapsed sheet.
      config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

      // Enable manual count change.
      config.useCase.sheetContent.manualCountChangeEnabled = true;

      // Set the delay before same barcode counting repeat.
      config.useCase.countingRepeatDelay = 1000;

      // Configure the submit button.
      config.useCase.sheetContent.submitButton.text = 'Submit';
      config.useCase.sheetContent.submitButton.foreground.color = '#000000';

      // Configure other parameters, pertaining to findAndPick-scanning mode as needed.

      // Set the expected barcodes.
      config.useCase.expectedBarcodes = [
        new ExpectedBarcode({
          barcodeValue: '123456',
          title: 'numeric barcode',
          count: 4,
          image: 'https://avatars.githubusercontent.com/u/1454920',
        }),
        new ExpectedBarcode({
          barcodeValue: 'SCANBOT',
          title: 'value barcode',
          count: 3,
          image: 'https://avatars.githubusercontent.com/u/1454920',
        }),
      ];

      // Set an array of accepted barcode types.
      config.recognizerConfiguration.barcodeFormats = acceptedBarcodeFormats;
      config.recognizerConfiguration.acceptedDocumentFormats =
        acceptedBarcodeDocumentFormats;

      // Configure other parameters as needed.
      const result = await startBarcodeScanner(config);
      /**
       * Handle the result if result status is OK
       */
      if (result.status === 'OK') {
        navigation.navigate(Screens.BARCODE_V2_RESULT, result);
      }
    } catch (e: any) {
      errorMessageAlert(e.message);
    }
  }, [acceptedBarcodeDocumentFormats, acceptedBarcodeFormats, navigation]);
}
