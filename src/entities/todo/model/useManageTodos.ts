import { useState } from 'react';
import { useStateWithLocalStorage } from '@/shared/lib';
import { Todo, TodoMapById } from '../api/todo';

interface ReturnType {
  todos: TodoMapById;
  createTodo: (todoInfo: Todo) => void;
  editTodo: (editedTodo: Todo) => void;
  toggleTodoById: (id: string) => void;
  removeTodo: (id: string) => void;
  cancelRemoveTodo: (id: string) => void;
}

export const useManageTodo = (): ReturnType => {
  const TODOS = 'todos';

  const [todos, setTodos] = useStateWithLocalStorage<TodoMapById>({}, TODOS);
  const [removedTodos, setRemovedTodos] = useState<TodoMapById>({});

  const createTodo = (todoInfo: Todo) => {
    const updatedTodoList = { ...todos };
    updatedTodoList[todoInfo.id] = todoInfo;
    setTodos(updatedTodoList);
  };

  const editTodo = (editedTodo: Todo) => {
    const updatedTodoList = { ...todos };
    updatedTodoList[editedTodo.id] = editedTodo;
    setTodos(updatedTodoList);
  };

  const toggleTodoById = (id: string) => {
    const updatedTodo = todos[id];
    if (updatedTodo) {
      updatedTodo.active = !updatedTodo.active;
      const updatedTodoList = { ...todos };
      updatedTodoList[updatedTodo.id] = updatedTodo;
      setTodos(updatedTodoList);
    }
  };

  const removeTodo = (id: string) => {
    const removedTodoInfo = todos[id];
    if (removedTodoInfo) {
      setRemovedTodos({ ...removedTodos, [id]: removedTodoInfo });
      const updatedTodoList = { ...todos };
      delete updatedTodoList[id];
      setTodos(updatedTodoList);
    }
  };

  const cancelRemoveTodo = (id: string) => {
    const restoredTodoInfo = todos[id];
    if (restoredTodoInfo) {
      setTodos((prev) => ({ ...prev, [id]: restoredTodoInfo }));
      const updatedRemoveTodoList = { ...removedTodos };
      delete updatedRemoveTodoList[id];
      setRemovedTodos(updatedRemoveTodoList);
    }
  };

  return {
    todos,
    createTodo,
    editTodo,
    toggleTodoById,
    removeTodo,
    cancelRemoveTodo,
  };
};
