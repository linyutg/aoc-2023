import { readData } from '../../shared.ts';
import chalk from 'chalk';
import lcm from 'compute-lcm';

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

export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0];
  const nodes = parseNetwork(data.slice(2));

  const aPos = nodes
    .filter((node) => node.self.endsWith('A'))
    .map((node) => node.self);
  const counts = new Array(aPos.length).fill(0);

  for (let k = 0; k < aPos.length; k++) {
    let pos = aPos[k];
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
        if (pos.endsWith('Z')) {
          break out;
        }
      }
    }

    counts[k] = count;
  }

  const ret = lcm(...counts);
  return ret;
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
