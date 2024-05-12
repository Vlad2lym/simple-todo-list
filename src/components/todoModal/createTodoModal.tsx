import { FC, useCallback, useState } from 'react';
import styles from './todoModal.module.scss';
import Title from '../title/title';
import InputText from '../UI/inputText/inputText';
import CustomButton from '../UI/customButton/customButton';
import { Todo } from '../../types/types';

interface IProps {
  onApply: (todo: Todo) => void;
  onCancel: () => void;
}

const CreateTodoModal: FC<IProps> = ({ onApply, onCancel }) => {
  const [titleTodo, setTitleTodo] = useState('');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim()) {
      return;
    }

    const todo = {
      [Date.now().toString()]: {
        title: titleTodo,
        active: true,
      },
    };

    onApply(todo);
    setTitleTodo('');
    onCancel();
  }, [titleTodo, onApply, onCancel]);

  return (
    <div className={styles.todoModal}>
      <Title className={styles.todoModalTitle}>NEW NOTE</Title>
      <InputText
        className={styles.todoModalInput}
        placeholder="Input your note..."
        value={titleTodo}
        onChange={onChangeTitleTodo}
      />
      <div className={styles.todoModalButtonsGroup}>
        <CustomButton onClick={onCancel}>CANCEL</CustomButton>
        <CustomButton onClick={onFormFinish} primary>
          APPLY
        </CustomButton>
      </div>
    </div>
  );
};

export default CreateTodoModal;
