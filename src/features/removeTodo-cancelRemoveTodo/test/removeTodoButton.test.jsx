import { render, screen } from '@testing-library/react';
import { RemoveTodoButton } from '../ui/removeTodoButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const todo = {
  id: '1',
  title: 'tested title',
  active: true,
  order: 1,
};

const removeTodo = jest.fn();
const cancelRemoveTodo = jest.fn();

it('should remove todo on click', async () => {
  render(<RemoveTodoButton todo={todo} removeTodo={removeTodo} cancelRemoveTodo={cancelRemoveTodo} />);

  const removeBtn = screen.getByRole('button');
  expect(removeTodo).not.toHaveBeenCalled();
  await userEvent.click(removeBtn);
  expect(removeTodo).toHaveBeenCalledWith('1');
  expect(removeTodo).toHaveBeenCalledTimes(1);
  // expect(await screen.findByText(/undo/i)).toBeInTheDocument();
});
