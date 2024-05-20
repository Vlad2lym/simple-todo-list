import { useCallback, useState } from 'react';
import { TodoInfo } from '../../types/types';
import { v4 as uuidv4 } from 'uuid';
import Modal, { ModalProps } from '../UI/modal/modal';
import TodoForm from '../todoForm/todoForm';

interface IProps extends Pick<ModalProps, 'show'> {
  onApply: (todoInfo: TodoInfo) => void;
  onCancel: () => void;
  editedTodo: TodoInfo | null;
  order: number;
}

const EditTodoModal = ({ onApply, onCancel, editedTodo, show, order }: IProps) => {
  const [titleTodo, setTitleTodo] = useState(editedTodo?.title ?? '');

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
      <TodoForm
        title="EDIT NOTE"
        onCancel={onCancel}
        onApply={onFormFinish}
        inputValue={titleTodo}
        onChangeInput={onChangeTitleTodo}
      />
    </Modal>
  );
};

export default EditTodoModal;
