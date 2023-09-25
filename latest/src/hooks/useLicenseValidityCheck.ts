import {useCallback} from 'react';
import {checkLicense} from '../utils/SDKUtils';

export function useLicenseValidityCheckWrapper(
  fn: (...args: any[]) => Promise<void> | void,
  args?: any[],
) {
  return useCallback(async () => {
    if (!(await checkLicense())) {
      return;
    }

    return fn(args);
  }, [args, fn]);
}
