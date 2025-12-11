import { render } from '@testing-library/react';
import App from './App';

test('renders without fail', () => {
  render(<App />);
  expect(true).toBe(true);
});
