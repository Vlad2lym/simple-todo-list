import { act, renderHook } from '@testing-library/react';
import { useFilterTodo } from '../model/useFilterTodo';
import { Filters } from '../api/filterTodo';

const todo = {
  1: {
    id: '1',
    title: 'title1',
    active: true,
    order: 1,
  },
  2: {
    id: '2',
    title: 'title2',
    active: false,
    order: 2,
  },
};

describe('useFilterTodo', () => {
  it('should return full collection', () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    expect(result.current.filteredTodos).toEqual(todo);
  });

  it('should return complete collection', async () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    await act(async () => result.current.onChangeFilter({ id: 2, title: 'Complete', value: Filters.complete }));
    const { filteredTodos } = result.current;
    expect({ ...filteredTodos['2'] }).toEqual(todo['2']);
  });

  it('should return incomplete collection', async () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    await act(async () => result.current.onChangeFilter({ id: 3, title: 'Incomplete', value: Filters.incomplete }));
    const { filteredTodos } = result.current;
    expect({ ...filteredTodos['1'] }).toEqual(todo['1']);
  });
});
