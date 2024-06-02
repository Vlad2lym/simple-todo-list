import { Todo } from '@/entities/todo';
import { CustomCheckbox } from '@/shared/ui/customCheckbox';

interface IProps {
  todo: Todo;
  toggleTodoById: (id: string) => void;
}

export const ToggleTodo = ({ todo, toggleTodoById }: IProps) => {
  return <CustomCheckbox id={todo.id} checked={!todo.active} onChange={(id) => toggleTodoById(id)} />;
};
