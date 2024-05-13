import { FC, useCallback, useState } from 'react';
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
  order: number;
}

const CreateTodoModal: FC<IProps> = ({ onApply, onCancel, order, show }) => {
  const [titleTodo, setTitleTodo] = useState('');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim()) {
      return;
    }

    const todoInfo: TodoInfo = {
      id: uuidv4(),
      title: titleTodo,
      active: true,
      order: order,
    };

    onApply(todoInfo);
    setTitleTodo('');
    onCancel();
  }, [titleTodo, onApply, onCancel, order]);

  return (
    <Modal show={show} onClose={onCancel}>
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
    </Modal>
  );
};

export default CreateTodoModal;
