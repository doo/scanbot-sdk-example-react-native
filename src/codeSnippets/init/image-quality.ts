import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

const configuration = new SdkConfiguration({
  licenseKey: '<YOUR_LICENSE_KEY_HERE>',
  storageImageFormat: 'JPG',
  storageImageQuality: 80,
});

const result = await ScanbotSDK.initialize(configuration);
