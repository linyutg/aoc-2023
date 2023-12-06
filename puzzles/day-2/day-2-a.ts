import { readData } from '../../shared.ts';
import chalk from 'chalk';

function getNumber(s: string): number {
  let [s1, s2] = s.split(':');
  let gameNumber = Number(s1.slice('game'.length));

  let cubeLists = s2.split(';');
  for (let cubeList of cubeLists) {
    let subCubs = cubeList.split(',');
    for (let subCub of subCubs) {
      let [s1, s2] = subCub.trim().split(' ');
      let number = Number(s1);
      s2 = s2.trim();
      switch (s2) {
        case 'red':
          if (number > 12) {
            return 0;
          }
          break;

        case 'green':
          if (number > 13) {
            return 0;
          }
          break;

        case 'blue':
          if (number > 14) {
            return 0;
          }
          break;

        default:
          break;
      }
    }
  }

  return gameNumber;
}

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let s of data) {
    sum += getNumber(s);
  }
  return sum;
}

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
