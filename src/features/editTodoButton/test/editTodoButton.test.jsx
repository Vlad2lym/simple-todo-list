import { render, screen } from '@testing-library/react';
import { EditTodoButton } from '../ui/editTodoButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

it('should open edit todo modal on click', async () => {
  render(<EditTodoButton onClick={onClick} idTodo="123" />);
  expect(onClick).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button'));
  expect(onClick).toHaveBeenCalledWith('123');
  expect(onClick).toHaveBeenCalledTimes(1);
});
