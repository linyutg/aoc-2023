import { readData } from '../../shared.ts';
import chalk from 'chalk';

function processRow(
  row: string,
  index: number,
  scratchcards: number[],
  multi: number
) {
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

  for (let i = 1; i <= num; i++) {
    scratchcards[index + i] += multi;
  }
}

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);

  let scratchcards = new Array<number>(data.length).fill(1);

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    processRow(row, i, scratchcards, scratchcards[i]);
  }

  let sum = 0;
  for (let s of scratchcards) {
    sum += s;
  }
  return sum;
}

const answer = await day4b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
