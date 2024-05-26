import { TodoItem } from '../../../entities/todoItem';
import { Todo } from '../../../shared/api';
import styles from '../styles/index.module.scss';

interface IProps {
  todos: Todo;
  toggleTodoById: (id: string) => void;
  openEditTodoModal: (id: string) => void;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const TodoList = ({ todos, toggleTodoById, openEditTodoModal, removeTodo, cancelRemoveTodo }: IProps) => {
  return (
    <div className={styles.todoList}>
      {Object.keys(todos).length ? (
        Object.values(todos).map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodoById={toggleTodoById}
            openEditTodoModal={openEditTodoModal}
            removeTodo={removeTodo}
            cancelRemoveTodo={cancelRemoveTodo}
          />
        ))
      ) : (
        <div className={styles.emptyList}>
          <div className={styles.emptyListImg} />
          <h2 className={styles.emptyListText}>Empty…</h2>
        </div>
      )}
    </div>
  );
};
