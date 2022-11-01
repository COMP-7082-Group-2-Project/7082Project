import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

test('default test', () => {
    expect(true).toBe(true);
})

test('renders "Compile and Execute" button', () => {
  render(<App />);
  const compile_button = screen.getByText(/compile and execute/i);
  expect(compile_button).toBeInTheDocument();
});
