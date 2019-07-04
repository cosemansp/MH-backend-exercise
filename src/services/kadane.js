/* eslint-disable prefer-destructuring */
export function kadanes(array) {
  const n = array.length;
  const dp = [];

  // base condition
  dp[0] = array[0];
  let answer = 0;
  for (let i = 1; i < n; i += 1) {
    dp[i] = Math.max(dp[i - 1], 0) + array[i];
    answer = Math.max(answer, dp[i]);
  }
  return answer;
}

export function sumArray(a1, a2) {
  return a1.map((num, idx) => num + a2[idx]);
}

// see also https://blog.abelotech.com/posts/array-conversion-2-dimensional-javascript/
export function splitArray(array, howMany) {
  const result = [];
  const input = [...array];
  while (input[0] !== undefined) {
    const part = input.splice(0, howMany);
    result.push(part);
  }
  return result;
}

export function kadanes2d(array) {
  let top = 0;
  let bottom = 0;
  let cache = [...array[top]];
  let maxSum = Math.max(0, kadanes(cache));

  while (bottom < array.length - 1 && top < array.length - 1) {
    bottom += 1;
    cache = sumArray(cache, array[bottom]);
    maxSum = Math.max(maxSum, kadanes(cache));
    if (bottom === array.length - 1) {
      top += 1;
      bottom = top;
      cache = [...array[top]];
    }
  }

  return maxSum;
}
