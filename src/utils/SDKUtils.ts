import ScanbotSDK from 'react-native-scanbot-sdk';
import { CameraImageFormat, FileEncryptionMode } from 'react-native-scanbot-sdk/src/enum';
import { Alert } from 'react-native';

export class SDKUtils {
  /*
   * TODO Add the Scanbot SDK license key here.
   * Please note: The Scanbot SDK will run without a license key for one minute per session!
   * After the trial period is over all Scanbot SDK functions as well as the UI components will stop working
   * or may be terminated. You can get an unrestricted "no-strings-attached" 30 day trial license key for free.
   * Please submit the trial license form (https://scanbot.io/en/sdk/demo/trial) on our website by using
   * the app identifier "io.scanbot.example.sdk.reactnative" of this example app.
   */
  // prettier-ignore
  static readonly SDK_LICENSE_KEY: string = '';

  static readonly IMAGE_FILE_FORMAT: CameraImageFormat = 'JPG';

  static readonly JPG_IMAGE_QUALITY = 80;

  static readonly FILE_ENCRYPTION_ENABLED: boolean = false;

  // prettier-ignore
  static readonly FILE_ENCRYPTION_PASSWORD: string = 'SomeSecretPa$$w0rdForFileEncryption';

  static readonly FILE_ENCRYPTION_MODE: FileEncryptionMode = 'AES256';

  public static async checkLicense(): Promise<boolean> {
    const info = await ScanbotSDK.getLicenseInfo();
    if (info.isLicenseValid) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    // eslint-disable-next-line no-alert
    Alert.alert('Alert', 'Scanbot SDK trial period or license has expired!');
    return false;
  }
}
