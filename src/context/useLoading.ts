import {createContext, Dispatch, SetStateAction, useState} from 'react';

export const ActivityIndicatorContext = createContext<{
  setLoading: Dispatch<SetStateAction<boolean>>;
}>({
  setLoading(_value: ((prevState: boolean) => boolean) | boolean): void {},
});

export function useLoading(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [loading, setLoading] = useState(false);

  return [loading, setLoading];
}
