import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/entities/todo';
import { TodoForm } from '@/entities/todoForm';

interface IProps {
  onApply: (todoInfo: Todo) => void;
  onCancel: () => void;
  order: number;
}

export const CreateTodoModal = ({ onApply, onCancel, order }: IProps) => {
  const [titleTodo, setTitleTodo] = useState('');

  const onChangeTitleTodo = (value: string) => {
    setTitleTodo(value);
  };

  const onFormFinish = useCallback(() => {
    if (!titleTodo.trim()) {
      return;
    }

    const todoInfo: Todo = {
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
    <>
      <TodoForm
        title="NEW NOTE"
        onCancel={onCancel}
        onApply={onFormFinish}
        inputValue={titleTodo}
        onChangeInput={onChangeTitleTodo}
      />
    </>
  );
};
