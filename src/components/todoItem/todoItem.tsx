import { FC, useState } from 'react';
import { ITodo } from '../../types/types';
import styles from './todoItem.module.scss';
import CustomCheckbox from '../UI/customCheckbox/customCheckbox';
import Modal from '../UI/modal/modal';
import EditTodoModal from '../todoModal/editTodoModal';

interface IProps {
  todo: ITodo;
  index: number;
  toggleTodoById: (id: number) => void;
  editTodo: (todo: ITodo) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: FC<IProps> = ({ todo, index, toggleTodoById, editTodo, removeTodo }) => {
  const [modalActive, setModalActive] = useState(false);

  const onCloseModal = () => {
    setModalActive(false);
  };

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
          <button className={styles.todoItemEditBtn} onClick={() => setModalActive(true)} />
          <button className={styles.todoItemRemoveBtn} onClick={() => removeTodo(todo.id)} />
        </div>
      </span>
      <Modal show={modalActive} onClose={onCloseModal}>
        <EditTodoModal editedTodo={todo} onCancel={onCloseModal} onApply={editTodo} />
      </Modal>
    </div>
  );
};

export default TodoItem;
