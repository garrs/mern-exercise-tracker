import { render, screen } from '@testing-library/react';
import App from './App';

test('test 1', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Exercise/i);
  console.log('uguki');
  console.log('8980');
  const arr = [1,2,3,5,6];
  const new_arr = arr.map(x => {return x * 100});
  console.log(new_arr);
  expect(linkElement).toBeInTheDocument();
});

test('test 2', () => {
  render(<App />);
  const linkElement = screen.getByText(/Create Exercise/i);
  console.log('uguki');
  console.log('8980');
  const arr = [1,2,3,5,6];
  const new_arr = arr.map(x => {return x * 123});
  console.log(new_arr);
  expect(linkElement).toBeInTheDocument();
});
