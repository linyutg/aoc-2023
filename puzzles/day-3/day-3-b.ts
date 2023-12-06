import { readData } from '../../shared.ts';
import chalk from 'chalk';

function adjacentSymbols(
  data: string[],
  row: number,
  start: number,
  end: number
) {
  let symbolPositions: [number, number][] = [];
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
        symbolPositions.push([pos[0], pos[1]]);
      }
    }
  }

  return symbolPositions;
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

function checkSymbol(
  map: Map<string, string[]>,
  data: string[],
  line: number,
  start: number,
  end: number
) {
  let row = data[line];
  let numStr = row.slice(start, end);
  let symbolPositions = adjacentSymbols(data, line, start, end - 1);
  for (let symbolPosition of symbolPositions) {
    const key = `${symbolPosition[0]}:${symbolPosition[1]}`;
    const values = map.get(key) || [];
    if (values.includes(numStr)) {
      continue;
    }
    values.push(numStr);
    map.set(key, values);
  }
}

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  // symbole position to numbers
  const map = new Map<string, string[]>();
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let row = data[i];

    let nonNumberIndex = -1;
    for (let j = 0; j < row.length; j++) {
      if (!(row[j] >= '0' && row[j] <= '9')) {
        if (j > nonNumberIndex + 1) {
          checkSymbol(map, data, i, nonNumberIndex + 1, j);
        }
        nonNumberIndex = j;
      }

      if (j == row.length - 1 && nonNumberIndex < j) {
        checkSymbol(map, data, i, nonNumberIndex + 1, j + 1);
      }
    }
  }

  console.log(map);
  for (let [key, values] of map) {
    if (values.length === 2) {
      sum += Number(values[0]) * Number(values[1]);
    }
  }
  return sum;
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
