import { useMemo, useState } from 'react';
import { TodoList } from '@/widgets/todoList';
import { AddTodoButton } from '@/features/addTodoButton';
import { CreateTodoModal } from '@/features/createTodo';
import { DarkModeButton } from '@/features/darkModeButton';
import { EditTodoModal } from '@/features/editTodo';
import { FilterTodo, useManageFilterTodo } from '@/features/filterTodo';
import { SearchTodoByTitle, useManageSearchTodoByTitle } from '@/features/searchTodoByTitle';
import { ToastProvider } from '@/features/toastProvider';
import { Todo, useManageTodo } from '@/entities/todo';
import { Modal } from '@/shared/ui/modal';
import { Title } from '@/shared/ui/title';
import styles from './styles/todoListPage.module.scss';

interface IProps {
  onChangeMode: () => void;
}

export const TodoListPage = ({ onChangeMode }: IProps) => {
  const [showCreateTodoModal, setShowCreateTodoModal] = useState(false);
  const [editedTodo, setEditedTodo] = useState<Todo | null>(null);

  const { todos, createTodo, editTodo, toggleTodoById, removeTodo, cancelRemoveTodo } = useManageTodo();

  const todosSortByOrder = useMemo(() => {
    return Object.fromEntries(Object.entries(todos).sort((a, b) => a[1].order - b[1].order));
  }, [todos]);

  const { onChangeFilter, filteredTodos } = useManageFilterTodo(todosSortByOrder);

  const {
    searchNote,
    onChangeSearchNote,
    searchedTodos: searchedFilteredTodos,
  } = useManageSearchTodoByTitle(filteredTodos);

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
        <div className={styles.header}>
          <Title className={styles.headerTitle}>TODO LIST</Title>
          <div className={styles.headerSettings}>
            <SearchTodoByTitle
              className={styles.headerInput}
              searchNote={searchNote}
              onChangeSearchNote={onChangeSearchNote}
            />
            <FilterTodo className={styles.headerSelect} onChangeFilter={onChangeFilter} />
            <DarkModeButton onChange={onChangeMode} />
          </div>
        </div>
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
      <Modal show={showCreateTodoModal} onClose={onCloseCreateTodoModal}>
        <CreateTodoModal onApply={createTodo} onCancel={onCloseCreateTodoModal} order={lastOrder + 1} />
      </Modal>
      <Modal show={!!editedTodo} onClose={onCloseEditTodoModal}>
        <EditTodoModal
          editedTodo={editedTodo}
          onCancel={onCloseEditTodoModal}
          onApply={editTodo}
          key={editedTodo?.id}
        />
      </Modal>
    </>
  );
};
