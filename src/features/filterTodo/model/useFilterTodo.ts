import { useMemo, useState } from 'react';
import { TodoMapById } from '@/entities/todo';
import { FilterOption, Filters } from '../api/filterTodo';

export const useFilterTodo = (todos: TodoMapById) => {
  const [filter, setFilter] = useState<Filters>(Filters.all);

  const onChangeFilter = (option: FilterOption) => {
    setFilter(Filters[option.value]);
  };

  const filteredTodos = useMemo(() => {
    if (filter === Filters.all) {
      return todos;
    } else if (filter === Filters.incomplete) {
      return Object.fromEntries(Object.entries(todos).filter(([, todoInfo]) => todoInfo.active));
    } else if (filter === Filters.complete) {
      return Object.fromEntries(Object.entries(todos).filter(([, todoInfo]) => !todoInfo.active));
    }

    return todos;
  }, [filter, todos]);

  return { onChangeFilter, filteredTodos };
};
