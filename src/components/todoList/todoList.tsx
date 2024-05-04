import { FC } from 'react';
import { ITodo } from '../../types/types';
import styles from './todoList.module.scss';
import TodoItem from '../todoItem/todoItem';

interface IProps {
  todos: ITodo[];
  toggleTodo: (id: number) => void;
  editTodo: (todo: ITodo) => void;
  removeTodo: (id: number) => void;
}

const TodoList: FC<IProps> = ({ todos, toggleTodo, editTodo, removeTodo }) => {
  return (
    <div className={styles['todo-list']}>
      {todos.length ? (
        todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            removeTodo={removeTodo}
          />
        ))
      ) : (
        <div className={styles['empty-list']}>
          <div className={styles['empty-list__img']} />
          <h2 className={styles['empty-list__text']}>Empty…</h2>
        </div>
      )}
    </div>
  );
};

export default TodoList;
