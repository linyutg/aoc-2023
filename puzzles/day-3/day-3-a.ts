import { readData } from '../../shared.ts';
import chalk from 'chalk';

function isAdjacentToSymbol(
  data: string[],
  row: number,
  start: number,
  end: number
): boolean {
  for (let i = start; i <= end; i++) {
    let positions = [
      [row - 1, i - 1],
      [row, i - 1],
      [row + 1, i - 1],

      [row - 1, i],
      [row + 1, i],

      [row - 1, i + 1],
      [row, i + 1],
      [row + 1, i + 1],
    ];

    for (let pos of positions) {
      if (isPositionSymbol(data, pos[0], pos[1])) {
        return true;
      }
    }
  }
}

function isSymbol(c: string): boolean {
  if (c === '.') {
    return false;
  }
  if (c >= '0' && c <= '9') {
    return false;
  }

  return true;
}

function isPositionSymbol(data: string[], i: number, j: number): boolean {
  if (i >= data.length || i < 0) {
    return false;
  }
  const row = data[i];

  if (j >= row.length || j < 0) {
    return false;
  }
  const char = row[j];

  return isSymbol(char);
}

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let row = data[i];

    let nonNumberIndex = -1;
    for (let j = 0; j < row.length; j++) {
      if (!(row[j] >= '0' && row[j] <= '9')) {
        if (j > nonNumberIndex + 1) {
          let numStr = row.slice(nonNumberIndex + 1, j);
          if (isAdjacentToSymbol(data, i, nonNumberIndex + 1, j - 1)) {
            sum += Number(numStr);
          }
        }
        nonNumberIndex = j;
      }

      if (j == row.length - 1 && nonNumberIndex < j) {
        let numStr = row.slice(nonNumberIndex + 1);
        if (isAdjacentToSymbol(data, i, nonNumberIndex + 1, j)) {
          sum += Number(numStr);
        }
      }
    }
  }

  return sum;
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
