import { ReactNode } from 'react';
import Title from '../title/title';
import styles from './todoModal.module.scss';
import CustomButton from '../UI/customButton/customButton';

interface IProps {
  title: string;
  children: ReactNode;
  onCancel: () => void;
  onApply: () => void;
}

const LayoutTodoModal = ({ title, children, onCancel, onApply }: IProps) => {
  return (
    <div className={styles.todoModal}>
      <Title className={styles.todoModalTitle}>{title}</Title>
      {children}
      <div className={styles.todoModalButtonsGroup}>
        <CustomButton onClick={onCancel}>CANCEL</CustomButton>
        <CustomButton onClick={onApply} primary>
          APPLY
        </CustomButton>
      </div>
    </div>
  );
};

export default LayoutTodoModal;
