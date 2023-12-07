import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);

  const times = data[0].split(':')[1].trim().split(/\s+/).map(Number);
  const distances = data[1].split(':')[1].trim().split(/\s+/).map(Number);

  const counts: number[] = new Array(times.length).fill(0);

  for (let i = 0; i < times.length; i++) {
    const time = times[i];

    for (let j = 0; j <= time; j++) {
      const distance = (time - j) * j;
      if (distance > distances[i]) {
        counts[i]++;
      }
    }
  }

  console.log(counts);
  let sum = 1;
  for (let count of counts) {
    sum = sum * count;
  }

  return sum;
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
