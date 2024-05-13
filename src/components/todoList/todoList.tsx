import { FC } from 'react';
import { Todo } from '../../types/types';
import styles from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';

interface IProps {
  todos: Todo;
  toggleTodoById: (id: string) => void;
  openEditTodoModal: (id: string) => void;
  removeTodo: (id: string) => void;
  addIdRemovedTodo: (id: string) => void;
  deleteIdRemovedTodo: (id: string) => void;
}

const TodoList: FC<IProps> = ({
  todos,
  toggleTodoById,
  openEditTodoModal,
  removeTodo,
  addIdRemovedTodo,
  deleteIdRemovedTodo,
}) => {
  return (
    <div className={styles.todoList}>
      {todos.size ? (
        [...todos.values()].map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodoById={toggleTodoById}
            openEditTodoModal={openEditTodoModal}
            removeTodo={removeTodo}
            addIdRemovedTodo={addIdRemovedTodo}
            deleteIdRemovedTodo={deleteIdRemovedTodo}
          />
        ))
      ) : (
        <div className={styles.emptyList}>
          <div className={styles.emptyListImg} />
          <h2 className={styles.emptyListText}>Empty…</h2>
        </div>
      )}
    </div>
  );
};

export default TodoList;
