import addIcon from '../../../shared/images/icons/add-icon.svg';
import styles from './addTodoButton.module.scss';

interface IProps {
  className?: string;
  onClick: () => void;
}

export const AddTodoButton = ({ className, onClick }: IProps) => {
  return (
    <div className={className ? `${styles.addTodoArea}} ${className}` : styles.addTodoArea}>
      <button className={styles.addTodoButton} onClick={onClick}>
        <img src={addIcon} />
      </button>
    </div>
  );
};
