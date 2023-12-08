import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Node = {
  self: string;
  left: string;
  right: string;
};

function parseNetwork(data: string[]) {
  let ret: Node[] = [];
  for (let row of data) {
    const [s1, s2] = row.split('=');
    const [left, right] = s2.trim().slice(1, -1).split(',');
    ret.push({
      self: s1.trim(),
      left: left.trim(),
      right: right.trim(),
    });
  }

  return ret;
}

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0];
  const nodes = parseNetwork(data.slice(2));

  let pos = 'AAA';
  let count = 0;
  out: while (true) {
    for (let i = 0; i < instructions.length; i++) {
      const dir = instructions[i];
      count++;
      for (let node of nodes) {
        if (node.self === pos) {
          if (dir === 'L') {
            pos = node.left;
          } else {
            pos = node.right;
          }
          break;
        }
      }
      if (pos === 'ZZZ') {
        break out;
      }
    }
  }

  return count;
}

const answer = await day8a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
