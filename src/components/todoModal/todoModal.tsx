import { FC, useCallback, useEffect, useState } from 'react';
import styles from './todoModal.module.scss';
import Title from '../title/title';
import InputText from '../UI/inputText/inputText';
import CustomButton from '../UI/customButton/customButton';
import { ITodo, OpenModalType } from '../../types/types';

interface IProps {
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  closeModal: () => void;
  openModalType: OpenModalType;
  editedTodo: ITodo | null;
}

const TodoModal: FC<IProps> = ({ addTodo, closeModal, editedTodo, openModalType, editTodo }) => {
  const [titleTodo, setTitleTodo] = useState('');

  useEffect(() => {
    if (openModalType === 'edit') {
      setTitleTodo(editedTodo?.title ?? '');
    } else if (openModalType === 'new') {
      setTitleTodo('');
    }
  }, [editedTodo, openModalType]);

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim()) {
      return;
    }

    const todo = {
      id: openModalType === 'new' ? Date.now() : editedTodo?.id ?? Date.now(),
      title: titleTodo,
      active: openModalType === 'new' ? true : editedTodo?.active ?? true,
    };

    if (openModalType === 'new') {
      addTodo(todo);
      setTitleTodo('');
    } else {
      editTodo(todo);
    }
    closeModal();
  }, [titleTodo, addTodo, editTodo, closeModal, openModalType, editedTodo]);

  return (
    <div className={styles['todo-modal']}>
      <Title className={styles['todo-modal__title']}>NEW NOTE</Title>
      <InputText
        className={styles['todo-modal__input']}
        placeholder="Input your note..."
        value={titleTodo}
        onChange={onChangeTitleTodo}
      />
      <div className={styles['todo-modal__buttons-group']}>
        <CustomButton onClick={closeModal}>CANCEL</CustomButton>
        <CustomButton onClick={onFormFinish} primary>
          APPLY
        </CustomButton>
      </div>
    </div>
  );
};

export default TodoModal;
