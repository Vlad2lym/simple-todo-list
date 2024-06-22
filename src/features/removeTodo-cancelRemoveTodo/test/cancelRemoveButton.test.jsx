import { render, screen } from '@testing-library/react';
import { CancelRemoveButton, dataTestId } from '../ui/cancelRemoveButton';

it('should cancel remove todo on click', () => {
  render(<CancelRemoveButton title="title of button - test" />);
  expect(screen.getByText(/undo/i)).toBeInTheDocument();
  expect(screen.getByText(/title of button - test/i)).toBeInTheDocument();
  const cancelRemoveBtn = screen.getByTestId(dataTestId);
  expect(cancelRemoveBtn).toMatchSnapshot();
});
