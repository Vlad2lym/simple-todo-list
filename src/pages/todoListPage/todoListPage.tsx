import { useMemo, useState } from 'react';
import { CreateTodoModal } from '../../features/createTodo';
import { EditTodoModal } from '../../features/editTodo';
import styles from './styles/todoListPage.module.scss';
import { Header } from '../../widgets/header';
import { Option } from '../../shared/api';
import { CustomSelect } from '../../shared/ui/customSelect';
import { InputText } from '../../shared/ui/inputText';
import { TodoList } from '../../widgets/todoList';
import { Todo, TodoInfo } from '../../shared/api';
import { ToastProvider } from '../../features/toastProvider';
import { DarkModeButton } from '../../features/darkModeButton';
import { AddTodoButton } from '../../features/addTodoButton';
import { Filters, filterOptions } from './api';

interface IProps {
  onChangeMode: () => void;
  todos: Todo;
  createTodo: (todoInfo: TodoInfo) => void;
  editTodo: (editedTodo: TodoInfo) => void;
  toggleTodoById: (id: string) => void;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const TodoListPage = ({
  onChangeMode,
  todos,
  createTodo,
  editTodo,
  toggleTodoById,
  removeTodo,
  cancelRemoveTodo,
}: IProps) => {
  const [searchNote, setSearchNote] = useState('');
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
