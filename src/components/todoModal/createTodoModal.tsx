import { useCallback, useState } from 'react';
import { TodoInfo } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from '../UI/modal/modal';
import TodoForm from '../todoForm/todoForm';

interface IProps extends Pick<ModalProps, 'show'> {
  onApply: (todoInfo: TodoInfo) => void;
  onCancel: () => void;
  order: number;
}

const CreateTodoModal = ({ onApply, onCancel, order, show }: IProps) => {
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
      <TodoForm
        title="NEW NOTE"
        onCancel={onCancel}
        onApply={onFormFinish}
        inputValue={titleTodo}
        onChangeInput={onChangeTitleTodo}
      />
    </Modal>
  );
};

export default CreateTodoModal;
