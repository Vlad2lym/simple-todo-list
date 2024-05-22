import { useEffect, useState } from 'react';

export const useStateWithLocalStorage = <T>(
  initialState: T,
  localStorageKey: string,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() =>
    JSON.parse(localStorage.getItem(localStorageKey) ?? JSON.stringify(initialState)),
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  return [state, setState];
};
