export const printMatrixSpiral = (matrix) => {
  if (!matrix || matrix.length === 0) return 'No matrix';

  const result = [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  let top = 0;
  let bottom = rows - 1;
  let left = 0;
  let right = cols - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}

let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [10, 11, 12],
  [13, 14, 15],
];

console.log(printMatrixSpiral(matrix));

export const myParseInt = (string) => {
  let result = 0;
  let sign = 1;
  let i = 0;

  string = string.trim();

  const isNegative = string[i] === '-';

  if (isNegative) {
    sign = -1;
    i++;
  } else if (string[i] === '+') {
    i++;
  }

  while (i < string.length) {
    const charCode = string.charCodeAt(i);
    const firstDigitCharcode = 48;
    const lastDigitCharcode = 57;
    const isDigit = firstDigitCharcode <= charCode && charCode <= lastDigitCharcode;

    if (!isDigit) return NaN;

    result = result * 10 + (charCode - firstDigitCharcode);
    i++;
  }

  return result * sign;
};

console.log(myParseInt('1234') + 2);