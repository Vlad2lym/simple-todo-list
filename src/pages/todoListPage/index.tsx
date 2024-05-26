import { useMemo, useState } from 'react';
import CreateTodoModal from '../../features/createTodo';
import EditTodoModal from '../../features/editTodo';
import styles from './styles/index.module.scss';
import { useStateWithLocalStorage } from '../../shared/lib';
import { Header } from '../../widgets/header';
import { AddTodoButton } from '../../shared/ui/addTodoButton';
import { Option } from '../../shared/api';
import { CustomSelect } from '../../shared/ui/customSelect';
import { DarkModeButton } from '../../shared/ui/darkModeButton';
import { InputText } from '../../shared/ui/inputText';
import { ToastProvider } from '../../shared/ui/toastProvider';
import { TodoList } from '../../widgets/todoList';
import { Todo, TodoInfo } from '../../shared/api';

interface IProps {
  onChangeMode: () => void;
}

const TODOS = 'todos';

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

export const TodoListPage = ({ onChangeMode }: IProps) => {
  const [searchNote, setSearchNote] = useState('');
  const [todos, setTodos] = useStateWithLocalStorage<Todo>({}, TODOS);
  const [removedTodos, setRemovedTodos] = useState<Todo>({});
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState<TodoInfo | null>(null);
  const [filter, setFilter] = useState<Filters>(Filters.all);

  const onChangeFilter = (option: { value: Filters } & Omit<Option, 'value'>) => {
    setFilter(Filters[option.value]);
  };

  const todosSortByOrder = useMemo(() => {
    return Object.fromEntries(Object.entries(todos).sort((a, b) => a[1].order - b[1].order));
  }, [todos]);

  const filteredTodos = useMemo(() => {
    if (filter === Filters.all) {
      return todosSortByOrder;
    } else if (filter === Filters.incomplete) {
      return Object.fromEntries(Object.entries(todosSortByOrder).filter(([, todoInfo]) => todoInfo.active));
    } else if (filter === Filters.complete) {
      return Object.fromEntries(Object.entries(todosSortByOrder).filter(([, todoInfo]) => !todoInfo.active));
    }

    return todosSortByOrder;
  }, [filter, todosSortByOrder]);

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
      setTodos((prev) => ({ ...prev, [id]: restoredTodoInfo }));
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
    <>
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
        key={editedTodo?.id}
      />
    </>
  );
};
