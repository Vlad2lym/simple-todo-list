import 'react-toastify/dist/ReactToastify.css';
import { TodoListPage } from '@/pages';
import { AppMode } from './api/appMode';
import { useManageAppMode } from './model/useManageAppMode';
import styles from './styles/index.module.scss';

function App() {
  const { appMode, onChangeAppMode } = useManageAppMode();

  return (
    <div className={appMode === AppMode.light ? styles.app : `${styles.app} ${styles.darkMode}`}>
      <TodoListPage onChangeMode={onChangeAppMode} />
    </div>
  );
}

export default App;
