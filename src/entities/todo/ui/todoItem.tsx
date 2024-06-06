import { ReactNode } from 'react';
import { Todo } from '../api/todo';
import styles from '../styles/todoItem.module.scss';

interface IProps {
  todo: Todo;
  index: number;
  checkbox: ReactNode;
  editTodoButton: ReactNode;
  removeTodoButton: ReactNode;
}

export const TodoItem = ({ todo, index, checkbox, editTodoButton, removeTodoButton }: IProps) => {
  return (
    <div className={styles.todoItem}>
      <hr style={{ display: index === 0 ? 'none' : 'block' }} className={styles.todoItemLine} />
      <span className={styles.todoItemContent}>
        <div className={styles.todoItemCheckbox}>{checkbox}</div>
        <p className={todo.active ? styles.todoItemText : `${styles.todoItemText} ${styles.todoItemTextDone}`}>
          {todo.title}
        </p>
        <div className={styles.todoItemOptions}>
          {editTodoButton}
          {removeTodoButton}
        </div>
      </span>
    </div>
  );
};
