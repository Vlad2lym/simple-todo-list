import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import InputText from './components/UI/inputText/inputText';
import DarkModeButton from './components/UI/darkModeButton/darkModeButton';
import CustomSelect from './components/UI/customSelect/customSelect';
import TodoList from './components/todoList/todoList';
import AddTodoButton from './components/UI/addTodoButton/addTodoButton';
import CreateTodoModal from './components/todoModal/createTodoModal';
import { Option, Todo, TodoInfo } from './types/types';
import EditTodoModal from './components/todoModal/editTodoModal';
import Header from './components/header/header';
import 'react-toastify/dist/ReactToastify.css';
import { useStateWithLocalStorage } from './hooks/useStateWithLocalStorage';
import ToastProvider from './components/toastProvider/toastProvider';

enum Filters {
  all = 'all',
  complete = 'complete',
  incomplete = 'incomplete',
}

const filterOptions: Array<{ value: Filters } & Omit<Option, 'value'>> = [
  { id: 1, title: 'ALL', value: Filters.all },
  { id: 2, title: 'Complete', value: Filters.complete },
  { id: 3, title: 'Incomplete', value: Filters.incomplete },
];

enum AppMode {
  light = 'light',
  dark = 'dark',
}

const APP_MODE = 'appMode';
const TODOS = 'todos';

function App() {
  const [appMode, setAppMode] = useStateWithLocalStorage<AppMode>(AppMode.light, APP_MODE);
  const [searchNote, setSearchNote] = useState('');
  const [todos, setTodos] = useStateWithLocalStorage<Todo>({}, TODOS);
  const [removedTodos, setRemovedTodos] = useState<Todo>({});
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoInfo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);

  const onChangeMode = () => {
    setAppMode((prev) => (prev === AppMode.light ? AppMode.dark : AppMode.light));
  };

  const onChangeFilter = (option: { value: Filters } & Omit<Option, 'value'>) => {
    setFilter(Filters[option.value]);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filters.all) {
      return todos;
    } else if (filter === Filters.incomplete) {
      return Object.fromEntries(Object.entries(todos).filter(([, todoInfo]) => todoInfo.active));
    } else if (filter === Filters.complete) {
      return Object.fromEntries(Object.entries(todos).filter(([, todoInfo]) => !todoInfo.active));
    }

    return todos;
  }, [filter, todos]);

  const searchedFilteredTodos = useMemo(() => {
    if (!searchNote) {
      return filteredTodos;
    }
    const lowerSearchNote = searchNote.toLowerCase();
    return Object.fromEntries(
      Object.entries(filteredTodos).filter(([, todoInfo]) => todoInfo.title.toLowerCase().includes(lowerSearchNote)),
    );
  }, [filteredTodos, searchNote]);

  const onChangeSearchNote = (value: string) => {
    setSearchNote(value);
  };

  const onCloseCreateTodoModal = () => {
    setShowCreateTodoModal(false);
  };

  const onOpenEditTodoModal = (id: string) => {
    setEditedTodo(todos[id] ?? null);
  };

  const onCloseEditTodoModal = () => {
    setEditedTodo(null);
  };

  const createTodo = (todoInfo: TodoInfo) => {
    const updatedTodoList = { ...todos };
    updatedTodoList[todoInfo.id] = todoInfo;
    setTodos(updatedTodoList);
  };

  const editTodo = (editedTodo: TodoInfo) => {
    const updatedTodoList = { ...todos };
    updatedTodoList[editedTodo.id] = editedTodo;
    setTodos(updatedTodoList);
  };

  const toggleTodoById = (id: string) => {
    const updatedTodo = todos[id];
    if (updatedTodo) {
      updatedTodo.active = !updatedTodo.active;
      const updatedTodoList = { ...todos };
      updatedTodoList[updatedTodo.id] = updatedTodo;
      setTodos(updatedTodoList);
    }
  };

  const removeTodo = (id: string) => {
    const removedTodoInfo = todos[id];
    if (removedTodoInfo) {
      setRemovedTodos({ ...removedTodos, [id]: removedTodoInfo });
      const updatedTodoList = { ...todos };
      delete updatedTodoList[id];
      setTodos(updatedTodoList);
    }
  };

  const cancelRemoveTodo = (id: string) => {
    const restoredTodoInfo = todos[id];
    if (restoredTodoInfo) {
      setTodos({ ...todos, [id]: restoredTodoInfo });
      const updatedRemoveTodoList = { ...removedTodos };
      delete updatedRemoveTodoList[id];
      setRemovedTodos(updatedRemoveTodoList);
    }
  };

  const lastOrder: number = useMemo(() => {
    let last = 0;
    Object.values(todos).forEach(({ order }) => {
      if (order > last) {
        last = order;
      }
    });
    return last;
  }, [todos]);

  return (
    <div className={appMode === AppMode.light ? styles.app : `${styles.app} ${styles.darkMode}`}>
      <div className={styles.wrapper}>
        <Header titleText="TODO LIST">
          <InputText
            className={styles.headerInput}
            placeholder="Search note..."
            value={searchNote}
            onChange={onChangeSearchNote}
            searched
          />
          <CustomSelect className={styles.headerSelect} options={filterOptions} onChange={onChangeFilter} />
          <DarkModeButton onChange={onChangeMode} />
        </Header>
        <div className={styles.content}>
          <ToastProvider className={styles.contentToast} autoClose={5000}>
            <TodoList
              todos={searchedFilteredTodos}
              toggleTodoById={toggleTodoById}
              openEditTodoModal={onOpenEditTodoModal}
              removeTodo={removeTodo}
              cancelRemoveTodo={cancelRemoveTodo}
            />
          </ToastProvider>
          <AddTodoButton className={styles.contentAddButton} onClick={() => setShowCreateTodoModal(true)} />
        </div>
      </div>
      <CreateTodoModal
        onApply={createTodo}
        onCancel={onCloseCreateTodoModal}
        order={lastOrder + 1}
        show={showCreateTodoModal}
      />
      <EditTodoModal
        editedTodo={editedTodo}
        onCancel={onCloseEditTodoModal}
        onApply={editTodo}
        show={!!editedTodo}
        order={lastOrder + 1}
      />
    </div>
  );
}

export default App;
