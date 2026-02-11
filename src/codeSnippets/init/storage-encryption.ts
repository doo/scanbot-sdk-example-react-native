import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

const configuration = new SdkConfiguration({
  licenseKey: '<YOUR_LICENSE_KEY_HERE>',
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
  fileEncryptionMode: 'AES256',
});

const result = await ScanbotSDK.initialize(configuration);
