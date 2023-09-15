import ScanbotSDK, {
  CameraImageFormat,
  ImageFilter,
  LicenseStatus,
} from 'react-native-scanbot-sdk';

export class SDKUtils {
  static readonly IMAGE_FILE_FORMAT: CameraImageFormat = 'JPG';

  static readonly FILE_ENCRYPTION_ENABLED: boolean = false;

  static readonly IMAGE_FILTERS = [
    'NONE',
    'COLOR_ENHANCED',
    'GRAYSCALE',
    'PURE_GRAYSCALE',
    'BINARIZED',
    'COLOR_DOCUMENT',
    'PURE_BINARIZED',
    'BACKGROUND_CLEAN',
    'BLACK_AND_WHITE',
    'OTSU_BINARIZATION',
    'DEEP_BINARIZATION',
    'LOW_LIGHT_BINARIZATION',
    'EDGE_HIGHLIGHT',
    'LOW_LIGHT_BINARIZATION_2',
  ] as ImageFilter[];

  public static async checkLicense(): Promise<boolean> {
    const info = await ScanbotSDK.getLicenseInfo();
    if (info.isLicenseValid) {
      // OK - we have a trial session, a valid trial license or valid production license.
      return true;
    }
    // @ts-ignore
    // eslint-disable-next-line no-alert
    alert(this.errorStringFromLicenseStatus(info.licenseStatus), 500);
    return false;
  }

  private static errorStringFromLicenseStatus(status: LicenseStatus) {
    switch (status) {
      case 'AppIDMismatch':
        return 'The App ID does not match the license key App ID';
      case 'Corrupted':
        return 'The license key seems to be corrupted';
      case 'Expired':
        return 'The license key has expired!';
      case 'NotSet':
        return 'The license key has not been set';
      case 'Trial':
        return 'The trial period has ended';
      case 'WrongOS':
        return 'The license key does not support the current platform';
      default:
        return "Scanbot SDK: there's a problem with the license";
    }
  }
}
