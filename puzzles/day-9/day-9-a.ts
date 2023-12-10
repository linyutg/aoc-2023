import { readData } from '../../shared.ts';
import chalk from 'chalk';

function diffSequence(numbers: number[]): number {
  let current = numbers;
  let ret = numbers[numbers.length - 1];
  while (true) {
    let array: number[] = [];

    for (let i = 1; i < current.length; i++) {
      const diff = current[i] - current[i - 1];
      array.push(diff);
    }
    ret += array[array.length - 1];

    let flag = true;
    for (let v of array) {
      if (v != 0) {
        flag = false;
        break;
      }
    }

    if (flag) {
      return ret;
    }
    current = array;
  }
}

export async function day9a(dataPath?: string) {
  const data = await readData(dataPath);

  let sum = 0;
  for (let s of data) {
    const numbers = s.split(' ').map(Number);
    sum += diffSequence(numbers);
  }

  return sum;
}

const answer = await day9a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
