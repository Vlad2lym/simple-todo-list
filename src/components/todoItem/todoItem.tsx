import { TodoInfo } from '../../types/types';
import styles from './todoItem.module.scss';
import CustomCheckbox from '../UI/customCheckbox/customCheckbox';
import { toast } from 'react-toastify';
import CancelRemoveButton from '../UI/cancelRemoveButton/cancelRemoveButton';

interface IProps {
  todo: TodoInfo;
  index: number;
  toggleTodoById: (id: string) => void;
  openEditTodoModal: (id: string) => void;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

const TodoItem = ({ todo, index, toggleTodoById, openEditTodoModal, removeTodo, cancelRemoveTodo }: IProps) => {
  return (
    <div className={styles.todoItem}>
      <hr style={{ display: index === 0 ? 'none' : 'block' }} className={styles.todoItemLine} />
      <span className={styles.todoItemContent}>
        <CustomCheckbox
          className={styles.todoItemCheckbox}
          id={todo.id}
          checked={!todo.active}
          onChange={(id) => toggleTodoById(id)}
        />
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

export default TodoItem;
