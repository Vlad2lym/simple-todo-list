import { useMemo, useState } from 'react';
import { TodoMapById } from '@/entities/todo';

export const useManageSearchTodoByTitle = (todos: TodoMapById) => {
  const [searchNote, setSearchNote] = useState('');

  const onChangeSearchNote = (value: string) => {
    setSearchNote(value);
  };

  const searchedTodos = useMemo(() => {
    if (!searchNote) {
      return todos;
    }
    const lowerSearchNote = searchNote.toLowerCase();
    return Object.fromEntries(
      Object.entries(todos).filter(([, todoInfo]) => todoInfo.title.toLowerCase().includes(lowerSearchNote)),
    );
  }, [todos, searchNote]);

  return { searchNote, onChangeSearchNote, searchedTodos };
};
