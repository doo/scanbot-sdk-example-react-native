import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

const config: ScanbotSdkConfiguration = {
  storageImageFormat: 'JPG',
  storageImageQuality: 80,
};

const result = await ScanbotSDK.initializeSDK(config);
