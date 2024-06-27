import { render, screen } from '@testing-library/react';
import { SearchTodoByTitle } from '../ui/searchTodoByTitle';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const onChange = jest.fn();

it('should search todo by title', async () => {
  const { rerender } = render(<SearchTodoByTitle onChangeSearchNote={onChange} searchNote="" />);
  const input = screen.getByPlaceholderText(/search note/i);
  await userEvent.type(input, 'title');
  expect(onChange.mock.calls).toHaveLength(5);
  rerender(<SearchTodoByTitle onChangeSearchNote={onChange} searchNote="title" />);
  expect(screen.getByDisplayValue('title')).toBeInTheDocument();
  expect(input.value).toBe('title');
  expect(input).toMatchSnapshot();
});
