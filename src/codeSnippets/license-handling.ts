import ScanbotSDK from 'react-native-scanbot-sdk';

if ((await ScanbotSDK.getLicenseInfo()).isValid) {
  // Calling ScanbotSDK API is safe now.
  // ...
}
