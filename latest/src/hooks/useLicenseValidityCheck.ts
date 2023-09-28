import {useCallback} from 'react';
import {checkLicense} from '../utils/SDKUtils';

export function useLicenseValidityCheckWrapper(
  fn: (...args: any[]) => Promise<void> | void,
) {
  return useCallback(
    async (...args: any[]) => {
      if (!(await checkLicense())) {
        return;
      }

      return fn(args);
    },
    [fn],
  );
}
