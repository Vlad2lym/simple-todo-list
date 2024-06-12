import { render, screen } from '@testing-library/react';
import { CancelRemoveButton } from '../ui/cancelRemoveButton';

test('cancel remove Btn', () => {
  render(<CancelRemoveButton title="title of button - test" />);
  expect(screen.getByText(/undo/i)).toBeInTheDocument();
  expect(screen.getByText(/title of button - test/i)).toBeInTheDocument();
  const cancelRemoveBtn = screen.getByTestId('cancelRemoveBtn');
  expect(cancelRemoveBtn).toMatchSnapshot();
});
