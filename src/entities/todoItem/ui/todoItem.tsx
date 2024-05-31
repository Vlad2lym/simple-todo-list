import styles from '../styles/todoItem.module.scss';
import { toast } from 'react-toastify';
import { TodoInfo } from '../../../shared/api';
import { CancelRemoveButton } from '../../../features/cancelRemoveButton';
import { ReactNode } from 'react';

interface IProps {
  todo: TodoInfo;
  index: number;
  checkbox: ReactNode;
  openEditTodoModal: (id: string) => void;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const TodoItem = ({ todo, index, openEditTodoModal, removeTodo, cancelRemoveTodo, checkbox }: IProps) => {
  return (
    <div className={styles.todoItem}>
      <hr style={{ display: index === 0 ? 'none' : 'block' }} className={styles.todoItemLine} />
      <span className={styles.todoItemContent}>
        <div className={styles.todoItemCheckbox}>{checkbox}</div>
        <p className={todo.active ? styles.todoItemText : `${styles.todoItemText} ${styles.todoItemTextDone}`}>
          {todo.title}
        </p>
        <div className={styles.todoItemOptions}>
          <button className={styles.todoItemEditBtn} onClick={() => openEditTodoModal(todo.id)} />
          <button
            className={styles.todoItemRemoveBtn}
            onClick={() => {
              removeTodo(todo.id);
              toast(<CancelRemoveButton title={todo.title} onClick={() => cancelRemoveTodo(todo.id)} />, {
                hideProgressBar: true,
              });
            }}
          />
        </div>
      </span>
    </div>
  );
};
