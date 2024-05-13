import { FC, useCallback, useEffect, useState } from 'react';
import styles from './todoModal.module.scss';
import Title from '../title/title';
import InputText from '../UI/inputText/inputText';
import CustomButton from '../UI/customButton/customButton';
import { TodoInfo } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from '../UI/modal/modal';

interface IProps extends Pick<ModalProps, 'show'> {
  onApply: (todoInfo: TodoInfo) => void;
  onCancel: () => void;
  editedTodo: TodoInfo | null;
  order: number;
}

const EditTodoModal: FC<IProps> = ({ onApply, onCancel, editedTodo, show, order }) => {
  const [titleTodo, setTitleTodo] = useState(editedTodo?.title ?? '');

  useEffect(() => {
    setTitleTodo(editedTodo?.title ?? '');
  }, [editedTodo]);

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim() || !editedTodo) {
      return;
    }

    const todo: TodoInfo = {
      id: editedTodo?.id ?? uuidv4(),
      title: titleTodo,
      active: editedTodo?.active ?? true,
      order: editedTodo?.order ?? order,
    };

    onApply(todo);
    onCancel();
  }, [titleTodo, onApply, onCancel, editedTodo, order]);

  return (
    <Modal onClose={onCancel} show={show}>
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
    </Modal>
  );
};

export default EditTodoModal;
