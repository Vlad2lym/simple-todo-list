import { FC } from 'react';
import { Todo } from '../../types/types';
import styles from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';

interface IProps {
  todos: Todo;
  toggleTodoById: (id: number) => void;
  editTodo: (todo: Todo) => void;
  removeTodo: (id: number) => void;
}

const TodoList: FC<IProps> = ({ todos, toggleTodoById, editTodo, removeTodo }) => {
  return (
    <div className={styles.todoList}>
      {Object.keys(todos).length ? (
        Object.entries(todos).map(([id, todoInfo], index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodoById={toggleTodoById}
            editTodo={editTodo}
            removeTodo={removeTodo}
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

export default TodoList;
