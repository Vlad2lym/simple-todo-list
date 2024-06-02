import { useCallback, useState } from 'react';
import { Todo } from '@/entities/todo';
import { TodoForm } from '@/entities/todoForm';

interface IProps {
  onApply: (todoInfo: Todo) => void;
  onCancel: () => void;
  editedTodo: Todo | null;
}

export const EditTodoModal = ({ onApply, onCancel, editedTodo }: IProps) => {
  const [titleTodo, setTitleTodo] = useState(editedTodo?.title ?? '');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim() || !editedTodo) {
      return;
    }

    const todo: Todo = {
      id: editedTodo.id,
      title: titleTodo,
      active: editedTodo.active,
      order: editedTodo.order,
    };

    onApply(todo);
    onCancel();
  }, [titleTodo, onApply, onCancel, editedTodo]);

  return (
    <>
      <TodoForm
        title="EDIT NOTE"
        onCancel={onCancel}
        onApply={onFormFinish}
        inputValue={titleTodo}
        onChangeInput={onChangeTitleTodo}
      />
    </>
  );
};
