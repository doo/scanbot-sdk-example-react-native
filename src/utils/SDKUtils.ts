import ScanbotSDK from 'react-native-scanbot-sdk/src';

export class SDKUtils {
  static license: string =
    '';

  public static async checkLicense(): Promise<boolean> {
    const info = await ScanbotSDK.getLicenseInfo();
    if (info.isLicenseValid) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert('Scanbot SDK trial period or license has expired!', 500);
    return false;
  }
}
