import { readData } from '../../shared.ts';
import chalk from 'chalk';

function getNumber(s: string): number {
  let first = 0;
  let second = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] >= '0' && s[i] <= '9') {
      first = Number(s[i]);
      break;
    }
  }

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] >= '0' && s[i] <= '9') {
      second = Number(s[i]);
      break;
    }
  }

  return first * 10 + second;
}

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let s of data) {
    sum += getNumber(s);
  }
  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
