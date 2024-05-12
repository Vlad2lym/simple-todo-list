import { FC, useCallback, useState } from 'react';
import styles from './todoModal.module.scss';
import Title from '../title/title';
import InputText from '../UI/inputText/inputText';
import CustomButton from '../UI/customButton/customButton';
import { ITodo } from '../../types/types';

interface IProps {
  onApply: (todo: ITodo) => void;
  onCancel: () => void;
  editedTodo: ITodo;
}

const EditTodoModal: FC<IProps> = ({ onApply, onCancel, editedTodo }) => {
  const [titleTodo, setTitleTodo] = useState(editedTodo?.title ?? '');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim()) {
      return;
    }

    const todo = {
      id: editedTodo?.id ?? Date.now(),
      title: titleTodo,
      active: editedTodo?.active ?? true,
    };

    onApply(todo);
    onCancel();
  }, [titleTodo, onApply, onCancel, editedTodo]);

  return (
    <div className={styles.todoModal}>
      <Title className={styles.todoModalTitle}>EDIT NOTE</Title>
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

export default EditTodoModal;
