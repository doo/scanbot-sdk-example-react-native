import ScanbotSDK, {StorageImageFormat} from 'react-native-scanbot-sdk';
import {errorMessageAlert} from './Alerts';

export const IMAGE_FILE_FORMAT: StorageImageFormat = 'JPG';
export const FILE_ENCRYPTION_ENABLED: boolean = false;

export async function checkLicense(): Promise<boolean> {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.isLicenseValid) {
    return true;
  }

  errorMessageAlert(info.licenseStatusMessage ?? 'License is not valid');
  return false;
}
