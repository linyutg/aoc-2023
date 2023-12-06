import { readData } from '../../shared.ts';
import chalk from 'chalk';

const numbers = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

function getNumber(s: string): number {
  let first = 0;
  let second = 0;

  firstLoop: for (let i = 0; i < s.length; i++) {
    if (s[i] >= '0' && s[i] <= '9') {
      first = Number(s[i]);
      break;
    }
    for (let j = 0; j < numbers.length; j++) {
      if (s.slice(i).startsWith(numbers[j])) {
        first = j;
        break firstLoop;
      }
    }
  }

  secondLoop: for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] >= '0' && s[i] <= '9') {
      second = Number(s[i]);
      break;
    }
    for (let j = 0; j < numbers.length; j++) {
      if (s.slice(i).startsWith(numbers[j])) {
        second = j;
        break secondLoop;
      }
    }
  }

  return first * 10 + second;
}

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let s of data) {
    sum += getNumber(s);
  }
  return sum;
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
