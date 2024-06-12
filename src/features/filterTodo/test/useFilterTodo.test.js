import { act, renderHook } from '@testing-library/react';
import { useFilterTodo } from '../model/useFilterTodo';
import { Filters } from '../api/filterTodo';

const todo = {
  ['1']: {
    id: '1',
    title: 'title1',
    active: true,
    order: 1,
  },
  ['2']: {
    id: '2',
    title: 'title2',
    active: false,
    order: 2,
  },
};

describe('useFilterTodo', () => {
  test('filter-all', () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    const { filteredTodos } = result.current;
    const keys = Object.keys(filteredTodos);
    expect(keys).toHaveLength(2);
    expect(keys).toEqual(['1', '2']);
    expect(filteredTodos).toEqual(todo);
  });

  test('filter-complete', () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    act(() => result.current.onChangeFilter({ id: 2, title: 'Complete', value: Filters.complete }));
    const { filteredTodos } = result.current;
    const keys = Object.keys(filteredTodos);
    expect(keys).toHaveLength(1);
    expect(keys).toEqual(['2']);
    expect(filteredTodos['2'].active).toBe(false);
  });

  test('filter-incomplete', () => {
    const { result } = renderHook(useFilterTodo, { initialProps: todo });
    act(() => result.current.onChangeFilter({ id: 3, title: 'Incomplete', value: Filters.incomplete }));
    const { filteredTodos } = result.current;
    const keys = Object.keys(filteredTodos);
    expect(keys).toHaveLength(1);
    expect(keys).toEqual(['1']);
    expect(filteredTodos['1'].active).toBe(true);
  });
});
