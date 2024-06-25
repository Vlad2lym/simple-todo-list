import styles from '../styles/editTodoButton.module.scss';

interface IProps {
  idTodo: string;
  onClick: (id: string) => void;
}

export const test_EditTodoBtn = 'test_EditTodoBtn';

export const EditTodoButton = ({ idTodo, onClick }: IProps) => {
  return (
    <>
      <button className={styles.editBtn} onClick={() => onClick(idTodo)} data-testid={test_EditTodoBtn} />
    </>
  );
};
