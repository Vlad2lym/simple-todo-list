import { render, screen } from '@testing-library/react';
import { CancelRemoveButton, test_CancelRemoveBtn } from '../ui/cancelRemoveButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const onClick = jest.fn();

it('should cancel remove todo on click', async () => {
  render(<CancelRemoveButton title="title of button - test" onClick={onClick} />);
  expect(screen.getByText(/undo/i)).toBeInTheDocument();
  expect(screen.getByText(/title of button - test/i)).toBeInTheDocument();
  const cancelRemoveBtn = screen.getByTestId(test_CancelRemoveBtn);
  expect(cancelRemoveBtn).toMatchSnapshot();
  await userEvent.click(cancelRemoveBtn.firstChild);
  expect(onClick).toHaveBeenCalledTimes(1);
});
