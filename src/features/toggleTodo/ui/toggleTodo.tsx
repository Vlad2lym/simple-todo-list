import { TodoInfo } from '../../../shared/api';
import { CustomCheckbox } from '../../../shared/ui/customCheckbox';

interface IProps {
  todo: TodoInfo;
  toggleTodoById: (id: string) => void;
}

export const ToggleTodo = ({ todo, toggleTodoById }: IProps) => {
  return <CustomCheckbox id={todo.id} checked={!todo.active} onChange={(id) => toggleTodoById(id)} />;
};
