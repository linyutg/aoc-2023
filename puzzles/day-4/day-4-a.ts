import { readData } from '../../shared.ts';
import chalk from 'chalk';

function getNumber(row: string): number {
  let [_, s] = row.split(':');
  let [s1, s2] = s.split('|');

  let list1 = s1.trim().split(/\s+/);
  let list2 = s2.trim().split(/\s+/);

  let num = 0;

  for (let item of list2) {
    if (list1.includes(item)) {
      num++;
    }
  }

  if (num == 0) {
    return 0;
  }

  return Math.pow(2, num - 1);
}

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let s of data) {
    sum += getNumber(s);
  }
  return sum;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
