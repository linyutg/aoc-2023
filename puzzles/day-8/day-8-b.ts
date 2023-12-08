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

export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);

  const instructions = data[0];
  const nodes = parseNetwork(data.slice(2));

  const aPos = nodes
    .filter((node) => node.self.endsWith('A'))
    .map((node) => node.self);
  let count = 0;

  console.log(aPos);

  out: while (true) {
    console.log(aPos);
    for (let i = 0; i < instructions.length; i++) {
      const dir = instructions[i];
      count++;
      for (let j = 0; j < aPos.length; j++) {
        for (let node of nodes) {
          if (node.self === aPos[j]) {
            if (dir === 'L') {
              aPos[j] = node.left;
            } else {
              aPos[j] = node.right;
            }
            break;
          }
        }
      }

      let done = true;
      for (let pos of aPos) {
        if (!pos.endsWith('Z')) {
          done = false;
          break;
        }
      }

      if (done) {
        return count;
      }
    }
  }

  return count;
}

const answer = await day8b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
