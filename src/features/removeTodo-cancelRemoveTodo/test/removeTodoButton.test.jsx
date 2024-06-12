import { fireEvent, render, screen } from '@testing-library/react';
import { RemoveTodoButton } from '../ui/removeTodoButton';

const todo = {
  id: '1',
  title: 'tested title',
  active: true,
  order: 1,
};

let removeTodoId = null;
let cancelRemoveTodoId = null;

const removeTodo = (id) => {
  removeTodoId = id;
};

const cancelRemoveTodo = (id) => {
  cancelRemoveTodoId = id;
};

test('remove todo Btn', async () => {
  render(<RemoveTodoButton todo={todo} removeTodo={removeTodo} cancelRemoveTodo={cancelRemoveTodo} />);
  const removeBtn = screen.getByRole('button');
  expect(removeTodoId).toBeNull();
  fireEvent.click(removeBtn);
  expect(removeTodoId).toBe('1');
});
