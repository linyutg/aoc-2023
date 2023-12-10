import { readData } from '../../shared.ts';
import chalk from 'chalk';

function diffSequence(numbers: number[]): number {
  let current = numbers;
  let seqs = [numbers[0]];
  while (true) {
    let array: number[] = [];

    for (let i = 1; i < current.length; i++) {
      const diff = current[i] - current[i - 1];
      array.push(diff);
    }

    seqs.push(array[0]);
    let flag = true;
    for (let v of array) {
      if (v != 0) {
        flag = false;
        break;
      }
    }

    if (flag) {
      break;
    }
    current = array;
  }

  let ret = 0;
  let add = true;
  for (let seq of seqs) {
    ret += add ? seq : -seq;
    add = !add;
  }
  return ret;
}

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath);

  let sum = 0;
  for (let s of data) {
    const numbers = s.split(' ').map(Number);
    sum += diffSequence(numbers);
  }

  return sum;
}

const answer = await day9b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
