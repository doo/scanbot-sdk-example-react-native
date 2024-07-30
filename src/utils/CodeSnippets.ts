import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';
import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from './SDKUtils.ts';
import {
  BarcodeMappedData,
  BarcodeScannerConfiguration,
  MultipleScanningMode,
  SingleScanningMode,
  startBarcodeScanner,
} from 'react-native-scanbot-sdk/ui_v2';

/* eslint @typescript-eslint/no-unused-vars: 0 */

async function initializeScanbotSDK() {
  try {
    // Please note: this is just an example license key string (it is not a valid license)
    const myLicenseKey =
      'fXbN2PmyqEAZ+btdkSIS36TuX2j/EE5qxVNcZMXYErbLQ' +
      '3OBnE10aOQxYI8L4UKwHiZ63jthvoFwUevttctBk0wVJ7Z' +
      '+Psz3/Ry8w7pXvfpB1o+JrnzGGcfwBnRi/5raQ2THDeokR' +
      'RB1keky2VBOFYbCfYt3Hqms5txF2z70PE/SBTMTIVuxL7q' +
      '1xcHDHclbEBriDtrHw8Pmhh9FqTg/r/4kRN/oEX37QGp+Y' +
      '3ogwIBbSmV+Cv+VuwtI31uXY3/GkyN/pSJZspIl+exwQDv' +
      'O0O1/R/oAURpfM4ydaWReRJtjW8+b1r9rUgPERguaXfcse' +
      'HlnclItgDfBHzUUFJJU/g==\nU2NhbmJvdFNESwppby5zY' +
      '2FuYm90LmRlbW8ueGFtYXJpbgoxNDg0NjExMTk5CjcxNjc' +
      'KMw==\n';

    const SDKInitializationOptions: ScanbotSdkConfiguration = {
      //The Scanbot SDK License Key
      licenseKey: myLicenseKey,
      loggingEnabled: true,
      enableNativeLogging: false,
      storageImageFormat: IMAGE_FILE_FORMAT,
      storageImageQuality: 80,
      documentDetectorMode: 'ML_BASED',
      allowGpuAcceleration: true,
      allowXnnpackAcceleration: true,
    } as const;

    // Set the following properties to enable encryption.
    if (FILE_ENCRYPTION_ENABLED) {
      SDKInitializationOptions.fileEncryptionMode = 'AES256';
      SDKInitializationOptions.fileEncryptionPassword =
        'SomeSecretPa$$w0rdForFileEncryption';
    }

    const sdkInit = await ScanbotSDK.initializeSDK(SDKInitializationOptions);
    console.log(sdkInit.result);
  } catch (error: any) {
    console.error(error);
  }
}

async function rotateImageBy90Degrees(imageUri: string) {
  try {
    const rotatedImageResult = await ScanbotSDK.rotateImage(imageUri, 90);
    return rotatedImageResult.imageFileUri;
  } catch (error: any) {
    console.error(error);
  }
}

async function statRtuUiV2WithDefaultConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // See further customization configs...

  const result = await startBarcodeScanner(config);
}

function rtuUiV2PaletteConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Simply alter one color and keep the other default.
  config.palette.sbColorPrimary = 'c86e19';

  // ... or set an entirely new palette.
  config.palette.sbColorPrimary = '#C8193C';
  config.palette.sbColorPrimaryDisabled = '#F5F5F5';
  config.palette.sbColorNegative = '#FF3737';
  config.palette.sbColorPositive = '#4EFFB4';
  config.palette.sbColorWarning = '#FFCE5C';
  config.palette.sbColorSecondary = '#FFEDEE';
  config.palette.sbColorSecondaryDisabled = '#F5F5F5';
  config.palette.sbColorOnPrimary = '#FFFFFF';
  config.palette.sbColorOnSecondary = '#C8193C';
  config.palette.sbColorSurface = '#FFFFFF';
  config.palette.sbColorOutline = '#EFEFEF';
  config.palette.sbColorOnSurfaceVariant = '#707070';
  config.palette.sbColorOnSurface = '#000000';
  config.palette.sbColorSurfaceLow = '#00000026';
  config.palette.sbColorSurfaceHigh = '#0000007A';
  config.palette.sbColorModalOverlay = '#000000A3';
}

async function statRtuUiV2WithUserGuidanceConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Hide/unhide the user guidance.
  config.userGuidance.visible = true;

  // Configure the title.
  config.userGuidance.title.text = 'Move the finder over a barcode';
  config.userGuidance.title.color = '#FFFFFF';

  // Configure the background.
  config.userGuidance.background.fillColor = '#0000007A';

  // Configure other parameters as needed.
}

function rtuUiV2TopBarConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Configure the top bar.

  // Set the top bar mode.
  config.topBar.mode = 'GRADIENT';

  // Set the background color which will be used as a gradient.
  config.topBar.backgroundColor = '#C8193C';

  // Configure the status bar look. If visible - select DARK or LIGHT according to your app's theme color.
  config.topBar.statusBarMode = 'HIDDEN';

  // Configure the Cancel button.
  config.topBar.cancelButton.text = 'Cancel';
  config.topBar.cancelButton.foreground.color = '#FFFFFF';

  // Configure other parameters as needed.
}

function rtuUiV2ActionBarConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Configure the action bar.

  // Hide/unhide the flash button.
  config.actionBar.flashButton.visible = true;

  // Configure the inactive state of the flash button.
  config.actionBar.flashButton.backgroundColor = '#0000007A';
  config.actionBar.flashButton.foregroundColor = '#FFFFFF';

  // Configure the active state of the flash button.
  config.actionBar.flashButton.activeBackgroundColor = '#FFCE5C';
  config.actionBar.flashButton.activeForegroundColor = '#000000';

  // Hide/unhide the zoom button.
  config.actionBar.zoomButton.visible = true;

  // Configure the inactive state of the zoom button.
  config.actionBar.zoomButton.backgroundColor = '#0000007A';
  config.actionBar.zoomButton.foregroundColor = '#FFFFFF';
  // Zoom button has no active state - it only switches between zoom levels (for configuring those please refer to camera configuring).

  // Hide/unhide the flip camera button.
  config.actionBar.flipCameraButton.visible = true;

  // Configure the inactive state of the flip camera button.
  config.actionBar.flipCameraButton.backgroundColor = '#0000007A';
  config.actionBar.flipCameraButton.foregroundColor = '#FFFFFF';
  // Flip camera button has no active state - it only switches between front and back camera.

  // Configure other parameters as needed.
}

function rtuUiV2PreviewModeConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  // Initialize the use case for multiple scanning.
  config.useCase = new MultipleScanningMode();

  // Set the sheet mode for the barcodes preview.
  config.useCase.sheet.mode = 'COLLAPSED_SHEET';

  // Set the height for the collapsed sheet.
  config.useCase.sheet.collapsedVisibleHeight = 'LARGE';

  // Configure the submit button on the sheet.
  config.useCase.sheetContent.submitButton.text = 'Submit';
  config.useCase.sheetContent.submitButton.foreground.color = '#000000';

  // Configure other parameters, pertaining to multiple-scanning mode as needed.

  // Configure other parameters as needed.
}

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

function rtuUiV2MappingItemConfiguration() {
  // Create the default configuration object.
  const config = new BarcodeScannerConfiguration();

  config.useCase = new SingleScanningMode();

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
    const image =
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
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

  // Configure other parameters as needed.
}
