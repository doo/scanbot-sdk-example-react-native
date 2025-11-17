import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

const config: ScanbotSdkConfiguration = {
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
  fileEncryptionMode: 'AES256',
};

const result = await ScanbotSDK.initializeSDK(config);
