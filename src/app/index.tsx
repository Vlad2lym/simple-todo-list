import styles from './styles/index.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useStateWithLocalStorage } from '../shared/lib';
import { TodoListPage } from '../pages';
import { AppMode } from '../shared/api';

const APP_MODE = 'appMode';

function App() {
  const [appMode, setAppMode] = useStateWithLocalStorage<AppMode>(AppMode.light, APP_MODE);

  const onChangeAppMode = () => {
    setAppMode((prev) => (prev === AppMode.light ? AppMode.dark : AppMode.light));
  };

  return (
    <div className={appMode === AppMode.light ? styles.app : `${styles.app} ${styles.darkMode}`}>
      <TodoListPage onChangeMode={onChangeAppMode} />
    </div>
  );
}

export default App;
