import { render, screen } from '@testing-library/react';
import { AddTodoButton, test_AddTodoBtn } from '../ui/addTodoButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

it('should add todo on click', async () => {
  const { container } = render(<AddTodoButton onClick={onClick} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(onClick).not.toHaveBeenCalled();
  await userEvent.click(screen.getByTestId(test_AddTodoBtn));
  expect(onClick).toHaveBeenCalledTimes(1);
});
