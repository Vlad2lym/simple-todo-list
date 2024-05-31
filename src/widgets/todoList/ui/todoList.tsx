import { TodoItem } from '../../../entities/todoItem';
import { ToggleTodo } from '../../../features/toggleTodo/ui/toggleTodo';
import { Todo } from '../../../shared/api';
import styles from '../styles/todoList.module.scss';

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
            openEditTodoModal={openEditTodoModal}
            removeTodo={removeTodo}
            cancelRemoveTodo={cancelRemoveTodo}
            checkbox={<ToggleTodo todo={todo} toggleTodoById={toggleTodoById} />}
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
