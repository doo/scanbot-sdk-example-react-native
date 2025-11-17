import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

const config: ScanbotSdkConfiguration = {
  licenseKey: '',
  loggingEnabled: true,
};

const result = await ScanbotSDK.initializeSDK(config);
