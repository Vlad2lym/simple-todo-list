import { useCallback, useState } from 'react';
import { TodoInfo } from '../../types/types';
import Modal, { ModalProps } from '../UI/modal/modal';
import TodoForm from '../todoForm/todoForm';

interface IProps extends Pick<ModalProps, 'show'> {
  onApply: (todoInfo: TodoInfo) => void;
  onCancel: () => void;
  editedTodo: TodoInfo | null;
}

const EditTodoModal = ({ onApply, onCancel, editedTodo, show }: IProps) => {
  const [titleTodo, setTitleTodo] = useState(editedTodo?.title ?? '');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim() || !editedTodo) {
      return;
    }

    const todo: TodoInfo = {
      id: editedTodo.id,
      title: titleTodo,
      active: editedTodo.active,
      order: editedTodo.order,
    };

    onApply(todo);
    onCancel();
  }, [titleTodo, onApply, onCancel, editedTodo]);

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
