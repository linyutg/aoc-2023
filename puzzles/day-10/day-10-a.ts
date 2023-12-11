import { readData } from '../../shared.ts';
import chalk from 'chalk';

const initDir = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

type Dir = {
  x: number;
  y: number;
  prevChar: string;
};

function isVertical(c: string) {
  if (c === '|') {
    return true;
  }
  if (c === '7') {
    return true;
  }
  if (c === 'F') {
    return true;
  }
  return false;
}

function isHorizontal(c: string) {
  if (c === '-') {
    return true;
  }
  if (c === 'L') {
    return true;
  }
  if (c === 'J') {
    return true;
  }
  return false;
}

function checkLoop(sx: number, sy: number, map: string[]) {
  let dir1: Dir;
  let dir2: Dir;

  for (let [x, y] of initDir) {
    let startX = sx + x;
    let startY = sy + y;
    if (map[startX] && map[startX][startY]) {
      if (
        (x != 0 && isVertical(map[startX][startY])) ||
        (y != 0 && isHorizontal(map[startX][startY]))
      ) {
        if (!dir1) {
          dir1 = {
            x,
            y,
            prevChar: map[startX][startY],
          };
        } else if (!dir2) {
          dir2 = {
            x,
            y,
            prevChar: map[startX][startY],
          };
        }
      }
    }
  }

  let step = 0;
  let s1x = sx;
  let s1y = sy;
  let s2x = sx;
  let s2y = sy;

  while (true) {
    step++;

    s1x += dir1.x;
    s1y += dir1.y;

    s2x += dir2.x;
    s2y += dir2.y;

    if (s1x === s2x && s1y === s2y) {
      break;
    }

    let c1 = map[s1x][s1y];
    let c2 = map[s2x][s2y];

    dir1 = getNextDir(dir1, c1);
    dir2 = getNextDir(dir2, c2);
  }
  return step;
}

function getNextDir(curDir: Dir, c: string): Dir {
  switch (c) {
    case 'L':
      if (curDir.x != 0) {
        return {
          x: 0,
          y: 1,
          prevChar: c,
        };
      } else {
        return {
          x: -1,
          y: 0,
          prevChar: c,
        };
      }
    case 'J':
      if (curDir.x != 0) {
        return {
          x: 0,
          y: -1,
          prevChar: c,
        };
      } else {
        return {
          x: -1,
          y: 0,
          prevChar: c,
        };
      }
    case '7':
      if (curDir.x != 0) {
        return {
          x: 0,
          y: -1,
          prevChar: c,
        };
      } else {
        return {
          x: 1,
          y: 0,
          prevChar: c,
        };
      }
    case 'F':
      if (curDir.x != 0) {
        return {
          x: 0,
          y: 1,
          prevChar: c,
        };
      } else {
        return {
          x: 1,
          y: 0,
          prevChar: c,
        };
      }
    case '|':
      // do not change dir
      return {
        ...curDir,
        prevChar: c,
      };
    case '-':
      // do not change dir
      return {
        ...curDir,
        prevChar: c,
      };
    default:
      break;
  }
  throw new Error('Error');
}

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);
  let sx = 0;
  let sy = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 'S') {
        sx = i;
        sy = j;
        return checkLoop(sx, sy, data);
      }
    }
  }
}

const answer = await day10a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
