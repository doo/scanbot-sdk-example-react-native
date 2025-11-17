import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

const config: ScanbotSdkConfiguration = {
  fileEncryptionMode: 'AES256',
  fileEncryptionPassword: 'SomeSecretPa$$w0rdForFileEncryption',
};

const result = await ScanbotSDK.initializeSDK(config);
