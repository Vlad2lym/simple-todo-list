import { toast } from 'react-toastify';
import { Todo } from '@/entities/todo';
import styles from '../styles/removeTodoButton.module.scss';
import { CancelRemoveButton } from './cancelRemoveButton';
export { ToastContainer } from 'react-toastify'; //for test

interface IProps {
  todo: Todo;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const test_RemoveTodoBtn = 'test_RemoveTodoBtn';

export const RemoveTodoButton = ({ todo, removeTodo, cancelRemoveTodo }: IProps) => {
  return (
    <button
      className={styles.removeBtn}
      data-testid={test_RemoveTodoBtn}
      onClick={() => {
        removeTodo(todo.id);
        toast(<CancelRemoveButton title={todo.title} onClick={() => cancelRemoveTodo(todo.id)} />, {
          hideProgressBar: true,
        });
      }}
    />
  );
};
