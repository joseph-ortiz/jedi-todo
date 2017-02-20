import { partial, pipe } from './utils';

const add = (a, b) => a + b;
const addThree = (a, b, c) => a + b + c;
const inc = num => num + 1;
const dbl = num => num * 2;

test('partial applies the first argument ahead of time', () => {
  const incr = partial(add, 1);
  const result = incr(2);
  expect(result).toBe(3);
});

test('partial applies the rest of the  argument ahead of time', () => {
  const incr = partial(addThree, 1);
  const result = incr(2, 3);
  expect(result).toBe(6);
});

test('pipe passes the results of inc to dbl', () => {
  const pipeline = pipe(inc, dbl);
  const result = pipeline(2);
  expect(result).toBe(6);
});

test('pipe passes the results of dbl to inc', () => {
  const pipeline = pipe(dbl, inc);
  const result = pipeline(2);
  expect(result).toBe(5);
});

test('pipe worsk with more than 2 functions', () => {
  const pipeline = pipe(add, inc, dbl, inc);
  const result = pipeline(1, 2);
  expect(result).toBe(9);
});
