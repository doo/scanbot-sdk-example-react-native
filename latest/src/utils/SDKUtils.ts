import ScanbotSDK, {
  StorageImageFormat,
  LicenseStatus,
} from 'react-native-scanbot-sdk';
import {errorMessageAlert} from './Alerts';
import BackgroundTimer from 'react-native-background-timer';

export const IMAGE_FILE_FORMAT: StorageImageFormat = 'JPG';
export const FILE_ENCRYPTION_ENABLED: boolean = false;

/**
 * If set to anything different than -1, the Ready-To-Use UI components will
 * be closed automatically after the value of RTU_TIMEOUT in milliseconds.
 */
export let RTU_TIMEOUT = -1;

/**
 * Sets a timeout based on the RTU_TIMEOUT property in SDKUtils.
 * @param callback The callback to execute after RTU_TIMEOUT milliseconds
 * @returns The promise
 */
export async function setRtuTimeout(callback: () => Promise<void>) {
  return RTU_TIMEOUT !== -1
    ? BackgroundTimer.runBackgroundTimer(async () => {
        console.log('RTU time-out callback called.');
        await callback();
        BackgroundTimer.stopBackgroundTimer();
      }, RTU_TIMEOUT)
    : null;
}

export async function checkLicense(): Promise<boolean> {
  const info = await ScanbotSDK.getLicenseInfo();
  if (info.isLicenseValid) {
    return true;
  }

  errorMessageAlert(errorStringFromLicenseStatus(info.licenseStatus));
  return false;
}

function errorStringFromLicenseStatus(status: LicenseStatus) {
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
