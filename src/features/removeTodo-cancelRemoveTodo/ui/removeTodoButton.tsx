import { toast } from 'react-toastify';
import { Todo } from '@/entities/todo';
import styles from '../styles/removeTodoButton.module.scss';
import { CancelRemoveButton } from './cancelRemoveButton';

interface IProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const RemoveTodoButton = ({ todo, removeTodo, cancelRemoveTodo }: IProps) => {
  return (
    <button
      className={styles.removeBtn}
      onClick={() => {
        removeTodo(todo.id);
        toast(<CancelRemoveButton title={todo.title} onClick={() => cancelRemoveTodo(todo.id)} />, {
          hideProgressBar: true,
        });
      }}
    />
  );
};
