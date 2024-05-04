import { FC } from 'react';
import { ITodo } from '../../types/types';
import styles from './todoItem.module.scss';
import CustomCheckbox from '../UI/customCheckbox/customCheckbox';

interface IProps {
  todo: ITodo;
  index: number;
  toggleTodo: (id: number) => void;
  editTodo: (todo: ITodo) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: FC<IProps> = ({ todo, index, toggleTodo, editTodo, removeTodo }) => {
  return (
    <div className={styles['todo-item']}>
      <hr style={{ display: index === 0 ? 'none' : 'block' }} className={styles['todo-item__line']} />
      <span className={styles['todo-item__content']}>
        <CustomCheckbox
          className={styles['todo-item__checkbox']}
          id={todo.id}
          checked={!todo.active}
          onChange={(id) => toggleTodo(id)}
        />
        <p
          className={
            todo.active ? styles['todo-item__text'] : `${styles['todo-item__text']} ${styles['todo-item__text--done']}`
          }
        >
          {todo.title}
        </p>
        <div className={styles['todo-item__options']}>
          <button className={styles['todo-item__edit-btn']} onClick={() => editTodo(todo)} />
          <button className={styles['todo-item__remove-btn']} onClick={() => removeTodo(todo.id)} />
        </div>
      </span>
    </div>
  );
};

export default TodoItem;
