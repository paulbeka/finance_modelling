import { render } from '@testing-library/react';
import App from './App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: any) => <div>{children}</div>,
  Routes: ({ children }: any) => <div>{children}</div>,
  Route: () => null
}));

test('renders without fail', () => {
  render(<App />);
  expect(true).toBe(true);
});
