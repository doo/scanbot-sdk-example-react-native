import ScanbotSDK, {ScanbotSdkConfiguration} from 'react-native-scanbot-sdk';

const config: ScanbotSdkConfiguration = {
  storageBaseDirectory: 'file:///some/custom/storage-dir/',
};

const result = await ScanbotSDK.initializeSDK(config);
