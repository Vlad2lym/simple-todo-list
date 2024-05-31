import styles from './styles/index.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useStateWithLocalStorage } from '../shared/lib';
import { TodoListPage } from '../pages';
import { AppMode, Todo, TodoInfo } from '../shared/api';
import { useState } from 'react';

const APP_MODE = 'appMode';
const TODOS = 'todos';

function App() {
  const [appMode, setAppMode] = useStateWithLocalStorage<AppMode>(AppMode.light, APP_MODE);
  const [todos, setTodos] = useStateWithLocalStorage<Todo>({}, TODOS);
  const [removedTodos, setRemovedTodos] = useState<Todo>({});

  const onChangeAppMode = () => {
    setAppMode((prev) => (prev === AppMode.light ? AppMode.dark : AppMode.light));
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
      setTodos((prev) => ({ ...prev, [id]: restoredTodoInfo }));
      const updatedRemoveTodoList = { ...removedTodos };
      delete updatedRemoveTodoList[id];
      setRemovedTodos(updatedRemoveTodoList);
    }
  };

  return (
    <div className={appMode === AppMode.light ? styles.app : `${styles.app} ${styles.darkMode}`}>
      <TodoListPage
        onChangeMode={onChangeAppMode}
        todos={todos}
        createTodo={createTodo}
        editTodo={editTodo}
        toggleTodoById={toggleTodoById}
        removeTodo={removeTodo}
        cancelRemoveTodo={cancelRemoveTodo}
      />
    </div>
  );
}

export default App;
