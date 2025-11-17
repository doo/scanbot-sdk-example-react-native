import ScanbotSDK from 'react-native-scanbot-sdk';

if ((await ScanbotSDK.getLicenseInfo()).isLicenseValid) {
  // Making your call to ScanbotSDK API is safe now.
  // ...
}
