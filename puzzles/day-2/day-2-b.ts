import { readData } from '../../shared.ts';
import chalk from 'chalk';

function getNumber(s: string): number {
  let [_, s2] = s.split(':');
  let cubeLists = s2.split(';');
  let red = 0;
  let green = 0;
  let blue = 0;
  for (let cubeList of cubeLists) {
    let subCubs = cubeList.split(',');
    for (let subCub of subCubs) {
      let [s1, s2] = subCub.trim().split(' ');
      let number = Number(s1);
      s2 = s2.trim();
      switch (s2) {
        case 'red':
          if (number > red) {
            red = number;
          }
          break;

        case 'green':
          if (number > green) {
            green = number;
          }
          break;

        case 'blue':
          if (number > blue) {
            blue = number;
          }
          break;

        default:
          break;
      }
    }
  }

  return red * green * blue;
}

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;

  for (let s of data) {
    sum += getNumber(s);
  }
  return sum;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
