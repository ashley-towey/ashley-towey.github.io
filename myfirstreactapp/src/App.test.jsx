import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/projects by Ashley Towey/i);
});
