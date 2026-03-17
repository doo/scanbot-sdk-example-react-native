import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

const configuration = new SdkConfiguration({
  licenseKey: '<YOUR_LICENSE_KEY_HERE>',
  loggingEnabled: true,
  enableNativeLogging: true,
});

const initResult = await ScanbotSDK.initialize(configuration);
