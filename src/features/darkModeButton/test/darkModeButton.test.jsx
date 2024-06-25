import { render, screen } from '@testing-library/react';
import { DarkModeButton, test_DarkModeBtn } from '../ui/darkModeButton';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

const onChange = jest.fn();

it('should change app mode on click', async () => {
  const { container } = render(<DarkModeButton onChange={onChange} />);
  expect(container.firstChild).toMatchSnapshot();
  expect(onChange).not.toHaveBeenCalled();
  await userEvent.click(screen.getByTestId(test_DarkModeBtn));
  expect(onChange).toHaveBeenCalledTimes(1);
});
