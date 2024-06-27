import { render, screen } from '@testing-library/react';
import { RemoveTodoButton, test_RemoveTodoBtn } from '../ui/removeTodoButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';
import { ToastContainer } from '../ui/removeTodoButton';

const todo = {
  id: '1',
  title: 'tested title',
  active: true,
  order: 1,
};

const removeTodo = jest.fn();
const cancelRemoveTodo = jest.fn();

it('should remove todo on click', async () => {
  render(
    <>
      <ToastContainer
        autoClose={false}
        closeOnClick
        position="bottom-center"
        closeButton={false}
        hideProgressBar
        pauseOnFocusLoss={false}
      />
      <RemoveTodoButton todo={todo} removeTodo={removeTodo} cancelRemoveTodo={cancelRemoveTodo} />
    </>,
  );

  const removeBtn = screen.getByTestId(test_RemoveTodoBtn);
  expect(removeTodo).not.toHaveBeenCalled();
  await userEvent.click(removeBtn);
  expect(removeTodo).toHaveBeenCalledWith('1');
  expect(removeTodo).toHaveBeenCalledTimes(1);
  const cancelRemoveTodoBtn = await screen.findByText(todo.title);
  expect(cancelRemoveTodoBtn).toBeInTheDocument();
  await userEvent.click(cancelRemoveTodoBtn);
  expect(cancelRemoveTodo).toHaveBeenCalledTimes(1);
  expect(cancelRemoveTodo).toHaveBeenCalledWith('1');
});
