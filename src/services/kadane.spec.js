import { kadanes, kadanes2d, splitArray, sumArray } from './kadane';

describe('Kadane', () => {
  test('1d array', () => {
    expect(kadanes([2, 0, 2, -3])).toBe(4);
    expect(kadanes([5, 1, -2, -3])).toBe(6);
    expect(kadanes([0, 1, -1, -3])).toBe(1);
    expect(kadanes([1, 14, -2, 4])).toBe(17);
    expect(kadanes([1, 6, -2, 3])).toBe(8);
  });

  test('2d array - [2, 0], [0, 1], [0, -2]', () => {
    expect(kadanes2d([[2, 0], [0, 1], [0, -2]])).toBe(3);
  });

  test('2d array - [2, 0, -3], [0, 1, 2], [0, 0, 4]', () => {
    expect(kadanes2d([[2, 0, -3], [0, 1, 2], [0, 0, 4]])).toBe(7);
  });

  test('split array', () => {
    expect(splitArray([2, 0, 2, -3], 2)).toEqual([[2, 0], [2, -3]]);
    expect(splitArray([0, 0, 2, -3], 2)).toEqual([[0, 0], [2, -3]]);
    expect(splitArray([2, 0, 2, -3, 5, 1], 3)).toEqual([[2, 0, 2], [-3, 5, 1]]);
    expect(splitArray([0, -2, -7, 0, 9, 2, -6, 2, -4, 1, -4, 1, -1, 8, 0, -2], 4)).toMatchSnapshot();
  });

  test('sum array', () => {
    const result = sumArray([2, 0], [2, -3]);
    expect(result).toEqual([4, -3]);
  });

  test('combined', () => {
    const array = splitArray([0, -2, -7, 0, 9, 2, -6, 2, -4, 1, -4, 1, -1, 8, 0, -2], 4);
    expect(kadanes2d(array)).toBe(15);
  });
});
