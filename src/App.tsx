import { useEffect, useMemo, useRef, useState } from 'react';
import './App.scss';
import Title from './components/title/title';
import InputText from './components/UI/inputText/inputText';
import DarkModeButton from './components/UI/darkModeButton/darkModeButton';
import CustomSelect from './components/UI/customSelect/customSelect';
import TodoList from './components/todoList/todoList';
import AddTodoButton from './components/UI/addTodoButton/addTodoButton';
import Modal from './components/UI/modal/modal';
import CreateTodoModal from './components/todoModal/createTodoModal';
import { Todo, Option } from './types/types';
import CancelRemoveButton from './components/UI/cancelRemoveButton/cancelRemoveButton';

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

enum lightMode {
  light = 'light',
  dark = 'dark',
}

const IS_LIGHT_MODE = 'isLightMode';
const TODOS = 'todos';

function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(JSON.parse(localStorage.getItem(IS_LIGHT_MODE) ?? 'true'));
  const [searchNote, setSearchNote] = useState('');
  const [todos, setTodos] = useState<Todo>(JSON.parse(localStorage.getItem(TODOS) ?? '{}'));
  const [modalActive, setModalActive] = useState(false);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [idRemovedTodo, setIdRemovedTodo] = useState(0);
  const [showCancelRemoveBtn, setShowCancelRemoveBtn] = useState(false);
  const removeTimeout = useRef<null | number>(null);

  const removeFilteredTodos = useMemo(() => {
    if (idRemovedTodo === 0) {
      return todos;
    }
    const filteredTodos = todos;
    delete filteredTodos[idRemovedTodo];
    return filteredTodos;
  }, [idRemovedTodo, todos]);

  const onChangeMode = () => {
    localStorage.setItem(IS_LIGHT_MODE, JSON.stringify(!isLightMode));
    setIsLightMode((prev) => !prev);
  };

  const onChangeFilter = (option: { value: Filters } & Omit<Option, 'value'>) => {
    setFilter(Filters[option.value]);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filters.all) {
      return removeFilteredTodos;
    } else if (filter === Filters.incomplete) {
      return removeFilteredTodos.filter((todo) => todo.active);
    } else if (filter === Filters.complete) {
      return removeFilteredTodos.filter((todo) => !todo.active);
    }

    return removeFilteredTodos;
  }, [filter, removeFilteredTodos]);

  const searchedFilteredTodos = useMemo(() => {
    if (!searchNote) {
      return filteredTodos;
    }
    const lowerSearchNote = searchNote.toLowerCase();
    return filteredTodos.filter((todo) => todo.title.toLowerCase().includes(lowerSearchNote));
  }, [filteredTodos, searchNote]);

  const onChangeSearchNote = (value: string) => {
    setSearchNote(value);
  };

  const onCloseModal = () => {
    setModalActive(false);
  };

  const addTodo = (todo: Todo) => {
    setTodos({ ...todos, ...todo });
  };

  const editTodo = (editedTodo: Todo) => {
    const updatedTodoList = todos.map((todo) => {
      if (editedTodo.id === todo.id) {
        return editedTodo;
      }
      return todo;
    });
    setTodos(updatedTodoList);
  };

  const toggleTodoById = (id: number) => {
    const updatedTodoList = todos.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.active = !todo.active;
      }
      return todo;
    });
    setTodos(updatedTodoList);
  };

  const removeTodo = (id: number) => {
    if (removeTimeout.current) {
      return;
    }
    setIdRemovedTodo(id);
    setShowCancelRemoveBtn(true);
    const updatedTodoList = todos.filter((todo) => todo.id !== id);
    removeTimeout.current = setTimeout(() => {
      setShowCancelRemoveBtn(false);
      setTodos(updatedTodoList);
      setIdRemovedTodo(0);
      removeTimeout.current = null;
    }, 5000);
  };

  const cancelRemoveTodo = () => {
    if (removeTimeout.current) {
      clearTimeout(removeTimeout.current);
      setShowCancelRemoveBtn(false);
      setIdRemovedTodo(0);
      removeTimeout.current = null;
    }
  };

  useEffect(() => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={isLightMode ? 'app' : 'app dark-mode'}>
      <div className="wrapper">
        <div className="header">
          <Title className="header__title">TODO LIST</Title>
          <div className="header__settings">
            <InputText
              className="header__input"
              placeholder="Search note..."
              value={searchNote}
              onChange={onChangeSearchNote}
              searched
            />
            <CustomSelect className="header__select" options={filterOptions} onChange={onChangeFilter} />
            <DarkModeButton onChange={onChangeMode} />
          </div>
          <div className="content">
            <TodoList
              todos={searchedFilteredTodos}
              toggleTodoById={toggleTodoById}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
            <AddTodoButton className="content__add-button" onClick={() => setModalActive(true)} />
            <CancelRemoveButton
              onClick={cancelRemoveTodo}
              className="content__cancel-remove-button"
              style={{ display: showCancelRemoveBtn ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>
      <Modal show={modalActive} onClose={onCloseModal}>
        <CreateTodoModal onApply={addTodo} onCancel={onCloseModal} />
      </Modal>
    </div>
  );
}

export default App;
