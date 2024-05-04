import { FC } from 'react';
import addIcon from '../../../assets/icons/add-icon.svg';
import styles from './addTodoButton.module.scss';

interface IProps {
  className?: string;
  onClick: () => void;
}

const AddTodoButton: FC<IProps> = ({ className, onClick }) => {
  return (
    <div className={className ? `${styles['add-todo-area']}} ${className}` : styles['add-todo-area']}>
      <button className={styles['add-todo-button']} onClick={onClick}>
        <img src={addIcon} />
      </button>
    </div>
  );
};

export default AddTodoButton;
