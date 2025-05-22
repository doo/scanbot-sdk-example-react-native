import {FILE_ENCRYPTION_ENABLED, IMAGE_FILE_FORMAT} from '@utils';

import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

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
      documentScannerEngineMode: 'ML',
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
  } catch (error: any) {
    console.error(error);
  }
}
