import { ReactNode } from 'react';
import styles from '../styles/index.module.scss';
import { Title } from '../../../shared/ui/title';
import { InputText } from '../../../shared/ui/inputText';
import { CustomButton } from '../../../shared/ui/customButton';

interface IProps {
  title: string;
  children?: ReactNode;
  onCancel: () => void;
  onApply: () => void;
  inputValue: string;
  onChangeInput: (value: string) => void;
}

export const TodoForm = ({ title, children, onCancel, onApply, inputValue, onChangeInput }: IProps) => {
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
