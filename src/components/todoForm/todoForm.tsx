import { ReactNode } from 'react';
import Title from '../title/title';
import styles from './todoForm.module.scss';
import CustomButton from '../UI/customButton/customButton';
import InputText from '../UI/inputText/inputText';

interface IProps {
  title: string;
  children?: ReactNode;
  onCancel: () => void;
  onApply: () => void;
  inputValue: string;
  onChangeInput: (value: string) => void;
}

const TodoForm = ({ title, children, onCancel, onApply, inputValue, onChangeInput }: IProps) => {
  return (
    <div className={styles.todoForm}>
      <Title className={styles.todoFormTitle}>{title}</Title>
      <InputText
        className={styles.todoFormInput}
        placeholder="Input your note..."
        value={inputValue}
        onChange={onChangeInput}
      />
      {children}
      <div className={styles.todoFormButtonsGroup}>
        <CustomButton onClick={onCancel}>CANCEL</CustomButton>
        <CustomButton onClick={onApply} primary>
          APPLY
        </CustomButton>
      </div>
    </div>
  );
};

export default TodoForm;
