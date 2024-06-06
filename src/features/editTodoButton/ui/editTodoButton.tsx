import styles from '../styles/editTodoButton.module.scss';

interface IProps {
  idTodo: string;
  openEditTodoModal: (id: string) => void;
}

export const EditTodoButton = ({ idTodo, openEditTodoModal }: IProps) => {
  return (
    <>
      <button className={styles.editBtn} onClick={() => openEditTodoModal(idTodo)} />
    </>
  );
};
