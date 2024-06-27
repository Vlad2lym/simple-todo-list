import { act, renderHook } from '@testing-library/react';
import { useSearchTodoByTitle } from '../model/useSearchTodoByTitle';

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

describe('useSearchTodoByTitle', () => {
  it('should return full collection', () => {
    const { result } = renderHook(useSearchTodoByTitle, { initialProps: todo });
    expect(result.current.searchedTodos).toEqual(todo);
  });

  it('should return todo id=1', async () => {
    const { result } = renderHook(useSearchTodoByTitle, { initialProps: todo });
    await act(async () => {
      result.current.onChangeSearchNote('1');
    });
    expect({ ...result.current.searchedTodos['1'] }).toEqual(todo['1']);
  });

  it('should return empty todo', async () => {
    const { result } = renderHook(useSearchTodoByTitle, { initialProps: todo });
    await act(async () => {
      result.current.onChangeSearchNote('3');
    });
    expect(result.current.searchedTodos).toEqual({});
  });
});
