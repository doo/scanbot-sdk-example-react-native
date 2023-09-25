import {useCallback} from 'react';
import {checkLicense} from '../utils/SDKUtils';

export function useLicenseValidityCheckWrapper(fn: () => Promise<void> | void) {
  return useCallback(async () => {
    if (!(await checkLicense())) {
      return;
    }

    return fn();
  }, [fn]);
}
