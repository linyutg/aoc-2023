import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);

  const time = Number(data[0].split(':')[1].trim().split(/\s+/).join(''));
  const distance = Number(data[1].split(':')[1].trim().split(/\s+/).join(''));

  let count = 0;

  for (let j = 0; j <= time; j++) {
    const dis = (time - j) * j;
    if (dis > distance) {
      count++;
    }
  }

  return count;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
