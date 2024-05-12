import { FC } from 'react';
import addIcon from '../../../assets/icons/add-icon.svg';
import styles from './addTodoButton.module.scss';

interface IProps {
  className?: string;
  onClick: () => void;
}

const AddTodoButton: FC<IProps> = ({ className, onClick }) => {
  return (
    <div className={className ? `${styles.addTodoArea}} ${className}` : styles.addTodoArea}>
      <button className={styles.addTodoButton} onClick={onClick}>
        <img src={addIcon} />
      </button>
    </div>
  );
};

export default AddTodoButton;
