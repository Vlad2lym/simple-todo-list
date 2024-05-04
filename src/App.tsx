import { useMemo, useRef, useState } from 'react';
import './App.scss';
import Title from './components/title/title';
import InputText from './components/UI/inputText/inputText';
import DarkModeButton from './components/UI/darkModeButton/darkModeButton';
import CustomSelect from './components/UI/customSelect/customSelect';
import TodoList from './components/todoList/todoList';
import AddTodoButton from './components/UI/addTodoButton/addTodoButton';
import Modal from './components/UI/modal/modal';
import TodoModal from './components/todoModal/todoModal';
import { ITodo, OpenModalType, Option } from './types/types';
import CancelRemoveButton from './components/UI/cancelRemoveButton/cancelRemoveButton';

const filterOptions = [
  { id: 1, value: 'ALL' },
  { id: 2, value: 'Complete' },
  { id: 3, value: 'Incomplete' },
];

enum Filters {
  all = 'all',
  complete = 'complete',
  incomplete = 'incomplete',
}

function App() {
  const [isLightMode, setIsLightMode] = useState<boolean>(JSON.parse(localStorage.getItem('isLightMode') ?? 'true'));
  const [searchNote, setSearchNote] = useState('');
  const [todos, setTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todos') ?? '[]'));
  const [modalActive, setModalActive] = useState(false);
  const [openModalType, setOpenModalType] = useState<OpenModalType>('new');
  const [editedTodo, setEditedTodo] = useState<ITodo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);
  const [idRemovedTodo, setIdRemovedTodo] = useState(0);
  const [showCancelRemoveBtn, setShowCancelRemoveBtn] = useState(false);
  const removeTimeout = useRef<null | number>(null);

  const removeFilteredTodos = useMemo(() => {
    if (idRemovedTodo === 0) {
      return todos;
    }
    return todos.filter((todo) => todo.id !== idRemovedTodo);
  }, [idRemovedTodo, todos]);

  const onChangeMode = () => {
    localStorage.setItem('isLightMode', JSON.stringify(!isLightMode));
    setIsLightMode((prev) => !prev);
  };

  const onChangeFilter = (option: Option) => {
    //@ts-ignore
    setFilter(Filters[option.value.toLowerCase()]);
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

  const onAddTodoHandler = () => {
    setEditedTodo(null);
    setOpenModalType('new');
    setModalActive(true);
  };

  const onEditTodoHandler = (todo: ITodo) => {
    setEditedTodo(todo);
    setOpenModalType('edit');
    setModalActive(true);
  };

  const postData = (todoList: ITodo[]) => {
    localStorage.setItem('todos', JSON.stringify(todoList));
    setTodos(todoList);
  };

  const addTodo = (todo: ITodo) => {
    const updatedTodoList = todos.concat([todo]);
    postData(updatedTodoList);
  };

  const editTodo = (editedTodo: ITodo) => {
    const updatedTodoList = todos.map((todo) => {
      if (editedTodo.id === todo.id) {
        return editedTodo;
      }
      return todo;
    });
    postData(updatedTodoList);
  };

  const toggleTodo = (id: number) => {
    const updatedTodoList = todos.map((todo: ITodo) => {
      if (todo.id === id) {
        todo.active = !todo.active;
      }
      return todo;
    });
    postData(updatedTodoList);
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
      postData(updatedTodoList);
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
              toggleTodo={toggleTodo}
              editTodo={onEditTodoHandler}
              removeTodo={removeTodo}
            />
            <AddTodoButton className="content__add-button" onClick={onAddTodoHandler} />
            <CancelRemoveButton
              onClick={cancelRemoveTodo}
              className="content__cancel-remove-button"
              style={{ display: showCancelRemoveBtn ? 'block' : 'none' }}
            />
          </div>
        </div>
      </div>
      <Modal modalActive={modalActive} setModalActive={setModalActive}>
        <TodoModal
          addTodo={addTodo}
          editTodo={editTodo}
          closeModal={() => setModalActive(false)}
          editedTodo={editedTodo}
          openModalType={openModalType}
        />
      </Modal>
    </div>
  );
}

export default App;
