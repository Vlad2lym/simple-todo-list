import { CustomButton } from '@/shared/ui/customButton';
import { InputText } from '@/shared/ui/inputText';
import { Title } from '@/shared/ui/title';
import styles from '../styles/todoForm.module.scss';

interface IProps {
  title: string;
  onCancel: () => void;
  onApply: () => void;
  inputValue: string;
  onChangeInput: (value: string) => void;
}

export const TodoForm = ({ title, onCancel, onApply, inputValue, onChangeInput }: IProps) => {
  return (
    <div className={styles.todoForm}>
      <Title className={styles.todoFormTitle}>{title}</Title>
      <InputText
        className={styles.todoFormInput}
        placeholder="Input your note..."
        value={inputValue}
        onChange={onChangeInput}
      />
      <div className={styles.todoFormButtonsGroup}>
        <CustomButton onClick={onCancel}>CANCEL</CustomButton>
        <CustomButton onClick={onApply} primary>
          APPLY
        </CustomButton>
      </div>
    </div>
  );
};
