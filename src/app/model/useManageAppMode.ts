import { useStateWithLocalStorage } from '@/shared/lib';
import { AppMode } from '../api/appMode';

export const useManageAppMode = () => {
  const APP_MODE = 'appMode';

  const [appMode, setAppMode] = useStateWithLocalStorage<AppMode>(AppMode.light, APP_MODE);

  const onChangeAppMode = () => {
    setAppMode((prev) => (prev === AppMode.light ? AppMode.dark : AppMode.light));
  };

  return { appMode, onChangeAppMode };
};
