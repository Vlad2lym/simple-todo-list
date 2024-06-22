import { render, screen } from '@testing-library/react';
import { ToggleTodo } from '../ui/toggleTodo';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const todo = {
  id: '1',
  title: 'title1',
  active: true,
  order: 1,
};

const todoCompleted = {
  id: '1',
  title: 'title1',
  active: false,
  order: 1,
};

const onClick = jest.fn();

it('should toggle todo on click', async () => {
  const { rerender, container } = render(<ToggleTodo todo={todo} toggleTodoById={onClick} />);
  const checkbox = screen.getByRole('checkbox');
  expect(container.firstChild).toMatchSnapshot();
  expect(onClick).not.toHaveBeenCalled();
  await userEvent.click(checkbox);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith('1');
  expect(screen.getByRole('checkbox', { checked: false })).toBeInTheDocument();
  rerender(<ToggleTodo todo={todoCompleted} toggleTodoById={onClick} />);
  expect(screen.getByRole('checkbox', { checked: true })).toBeInTheDocument();
});
