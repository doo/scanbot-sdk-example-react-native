import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

const configuration = new SdkConfiguration({
  licenseKey: '<YOUR_LICENSE_KEY_HERE>',
  storageBaseDirectory: 'file:///some/custom/storage-dir/',
});

const result = await ScanbotSDK.initialize(configuration);
