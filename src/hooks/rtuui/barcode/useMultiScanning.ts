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
  BarcodeMappedData,
  BarcodeScannerConfiguration,
  MultipleScanningMode,
  startBarcodeScanner,
} from 'react-native-scanbot-sdk/ui_v2';

export function useMultiScanning() {
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

      // Initialize the use case for multiple scanning.
      config.useCase = new MultipleScanningMode();

      // Set the counting mode.
      config.useCase.mode = 'COUNTING';

      // Set the sheet mode for the barcodes preview.
      config.useCase.sheet.mode = 'COLLAPSED_SHEET';

      // Set the height for the collapsed sheet.
      config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

      // Enable manual count change.
      config.useCase.sheetContent.manualCountChangeEnabled = true;

      // Set the delay before same barcode counting repeat.
      config.useCase.countingRepeatDelay = 1000;

      // Configure the submit button.
      config.useCase.sheetContent.submitButton.text = 'Submit';
      config.useCase.sheetContent.submitButton.foreground.color = '#000000';

      // Implement mapping for the barcode item information
      config.useCase.barcodeInfoMapping.barcodeItemMapper = (
        barcodeItem,
        onResult,
        onError,
      ) => {
        /** TODO: process scan result as needed to get your mapped data,
         * e.g. query your server to get product image, title and subtitle.
         * See example below.
         */
        const title = `Some product ${barcodeItem.textWithExtension}`;
        const subtitle = barcodeItem.type ?? 'Unknown';

        // If image from URL is used, on Android platform INTERNET permission is required.
        const image = 'https://avatars.githubusercontent.com/u/1454920';
        // To show captured barcode image use BarcodeMappedData.barcodeImageKey
        // const image = BarcodeMappedData.barcodeImageKey;

        /** Call onError() in case of error during obtaining mapped data. */
        if (barcodeItem.textWithExtension === 'Error occurred!') {
          onError();
        } else {
          onResult(
            new BarcodeMappedData({
              title: title,
              subtitle: subtitle,
              barcodeImage: image,
            }),
          );
        }
      };

      // Configure other parameters, pertaining to multiple-scanning mode as needed.

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
