import { EditTodoButton } from '@/features/editTodoButton';
import { RemoveTodoButton } from '@/features/removeTodo-cancelRemoveTodo';
import { ToggleTodo } from '@/features/toggleTodo';
import { TodoItem, TodoMapById } from '@/entities/todo';
import styles from '../styles/todoList.module.scss';

interface IProps {
  todos: TodoMapById;
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
            checkbox={<ToggleTodo todo={todo} toggleTodoById={toggleTodoById} />}
            editTodoButton={<EditTodoButton idTodo={todo.id} onClick={openEditTodoModal} />}
            removeTodoButton={
              <RemoveTodoButton todo={todo} removeTodo={removeTodo} cancelRemoveTodo={cancelRemoveTodo} />
            }
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
