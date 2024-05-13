import { useEffect, useMemo, useState } from 'react';
import styles from './App.module.scss';
import InputText from './components/UI/inputText/inputText';
import DarkModeButton from './components/UI/darkModeButton/darkModeButton';
import CustomSelect from './components/UI/customSelect/customSelect';
import TodoList from './components/todoList/todoList';
import AddTodoButton from './components/UI/addTodoButton/addTodoButton';
import CreateTodoModal from './components/todoModal/createTodoModal';
import { Option, Todo, TodoInfo } from './types/types';
import CancelRemoveButton from './components/UI/cancelRemoveButton/cancelRemoveButton';
import EditTodoModal from './components/todoModal/editTodoModal';
import Header from './components/header/header';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';

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

enum removedIdAction {
  add = 'add',
  delete = 'delete',
}

interface removedId {
  id: string;
  action: removedIdAction;
}

const APP_MODE = 'appMode';
const TODOS = 'todos';

function App() {
  const [appMode, setAppMode] = useState<AppMode>(() => JSON.parse(localStorage.getItem(APP_MODE) ?? '"light"'));
  const [searchNote, setSearchNote] = useState('');
  const [todos, setTodos] = useState<Todo>(
    () => new Map<string, TodoInfo>(Object.entries(JSON.parse(localStorage.getItem(TODOS) ?? '{}'))),
  );
  const [idDeleteTodo, setIdDeleteTodo] = useState<string>('');
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoInfo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [idRemovedTodo, setIdRemovedTodo] = useState<string[]>([]);
  const [idRemoved, setIdRemoved] = useState<removedId>();
  const [showCancelRemoveBtn, setShowCancelRemoveBtn] = useState(false);

  useEffect(() => {
    if (!idRemoved) {
      setIdRemovedTodo([]);
    } else if (idRemoved.action === removedIdAction.add) {
      setIdRemovedTodo([...idRemovedTodo, idRemoved.id]);
    } else if (idRemoved.action === removedIdAction.delete) {
      setIdRemovedTodo(idRemovedTodo.filter((id) => id !== idRemoved.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idRemoved]);

  const removeFilteredTodos = useMemo(() => {
    if (!idRemovedTodo.length) {
      return todos;
    }
    const filteredTodos = new Map(todos);
    idRemovedTodo.forEach((id) => {
      filteredTodos.delete(id);
    });
    return filteredTodos;
  }, [idRemovedTodo, todos]);

  const onChangeMode = () => {
    localStorage.setItem(APP_MODE, JSON.stringify(appMode === AppMode.light ? AppMode.dark : AppMode.light));
    setAppMode((prev) => (prev === AppMode.light ? AppMode.dark : AppMode.light));
  };

  const onChangeFilter = (option: { value: Filters } & Omit<Option, 'value'>) => {
    setFilter(Filters[option.value]);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filters.all) {
      return removeFilteredTodos;
    } else if (filter === Filters.incomplete) {
      return new Map([...removeFilteredTodos.entries()].filter(([, todoInfo]) => todoInfo.active));
    } else if (filter === Filters.complete) {
      return new Map([...removeFilteredTodos.entries()].filter(([, todoInfo]) => !todoInfo.active));
    }

    return removeFilteredTodos;
  }, [filter, removeFilteredTodos]);

  const searchedFilteredTodos = useMemo(() => {
    if (!searchNote) {
      return filteredTodos;
    }
    const lowerSearchNote = searchNote.toLowerCase();
    return new Map(
      [...filteredTodos.entries()].filter(([, todoInfo]) => todoInfo.title.toLowerCase().includes(lowerSearchNote)),
    );
  }, [filteredTodos, searchNote]);

  const onChangeSearchNote = (value: string) => {
    setSearchNote(value);
  };

  const onCloseCreateTodoModal = () => {
    setShowCreateTodoModal(false);
  };

  const onOpenEditTodoModal = (id: string) => {
    setEditedTodo(todos.get(id) ?? null);
  };

  const onCloseEditTodoModal = () => {
    setEditedTodo(null);
  };

  const createTodo = (todoInfo: TodoInfo) => {
    const updatedTodoList = new Map(todos);
    updatedTodoList.set(todoInfo.id, todoInfo);
    setTodos(updatedTodoList);
  };

  const editTodo = (editedTodo: TodoInfo) => {
    const updatedTodoList = new Map(todos);
    updatedTodoList.set(editedTodo.id, editedTodo);
    setTodos(updatedTodoList);
  };

  const toggleTodoById = (id: string) => {
    const updatedTodo = todos.get(id);
    if (updatedTodo) {
      updatedTodo.active = !updatedTodo.active;
      const updatedTodoList = new Map(todos);
      updatedTodoList.set(updatedTodo.id, updatedTodo);
      setTodos(updatedTodoList);
    }
  };
  const addIdRemovedTodo = (id: string) => {
    setIdRemoved({ id, action: removedIdAction.add });
  };

  const deleteIdRemovedTodo = (id: string) => {
    setIdRemoved({ id, action: removedIdAction.delete });
  };

  const removeTodo = (id: string) => {
    setIdDeleteTodo(id);
  };

  useEffect(() => {
    const updatedTodoList = new Map(todos);
    updatedTodoList.delete(idDeleteTodo);
    setTodos(updatedTodoList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idDeleteTodo]);

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(Object.fromEntries(todos)));
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
          <TodoList
            todos={searchedFilteredTodos}
            toggleTodoById={toggleTodoById}
            openEditTodoModal={onOpenEditTodoModal}
            removeTodo={removeTodo}
            addIdRemovedTodo={addIdRemovedTodo}
            deleteIdRemovedTodo={deleteIdRemovedTodo}
          />
          <AddTodoButton className={styles.contentAddButton} onClick={() => setShowCreateTodoModal(true)} />
          <CancelRemoveButton
            onClick={() => setShowCancelRemoveBtn(false)}
            className={styles.contentCancelRemoveButton}
            title="tt"
            style={{ display: showCancelRemoveBtn ? 'block' : 'none' }}
          />
          <ToastContainer
            className={styles.contentToast}
            autoClose={5000}
            closeOnClick
            position="bottom-center"
            transition={Bounce}
            closeButton={false}
            hideProgressBar
            pauseOnFocusLoss={false}
          />
        </div>
      </div>
      <CreateTodoModal
        onApply={createTodo}
        onCancel={onCloseCreateTodoModal}
        order={todos.size + 1}
        show={showCreateTodoModal}
      />
      <EditTodoModal
        editedTodo={editedTodo}
        onCancel={onCloseEditTodoModal}
        onApply={editTodo}
        show={!!editedTodo}
        order={todos.size + 1}
      />
    </div>
  );
}

export default App;
