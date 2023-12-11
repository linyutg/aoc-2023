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

function isVertical(c: string, x: number) {
  if (c === '|') {
    return true;
  }
  if (x < 0 && (c === '7' || c === 'F')) {
    return true;
  } else if (x > 0 && (c === 'J' || c === 'L')) {
    return true;
  }
  return false;
}

function isHorizontal(c: string, y: number) {
  if (c === '-') {
    return true;
  }
  if (y > 0 && (c === 'J' || c === '7')) {
    return true;
  } else if (y < 0 && (c === 'L' || c === 'F')) {
    return true;
  }
  return false;
}

function getAllPointsInLoop(sx: number, sy: number, map: string[]) {
  let ret: [number, number, number][] = [[sx, sy, 0]];
  let dir1: Dir;
  let dir2: Dir;

  for (let [x, y] of initDir) {
    let startX = sx + x;
    let startY = sy + y;
    if (map[startX] && map[startX][startY]) {
      if (
        (x != 0 && isVertical(map[startX][startY], x)) ||
        (y != 0 && isHorizontal(map[startX][startY], y))
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
    s1x += dir1.x;
    s1y += dir1.y;

    step++;

    s2x += dir2.x;
    s2y += dir2.y;

    ret.push([s1x, s1y, step]);
    ret.push([s2x, s2y, step]);

    if (s1x === s2x && s1y === s2y) {
      break;
    }

    let c1 = map[s1x][s1y];
    let c2 = map[s2x][s2y];

    dir1 = getNextDir(dir1, c1);
    dir2 = getNextDir(dir2, c2);
  }
  return ret;
}

function dump(data: string[], allPoints: [number, number, number][]) {
  let s = '';
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const level = isPointsInLoop(i, j, allPoints);
      if (level >= 0) {
        s += `${` ${level > 9 ? level : '0' + level} `}`;
      } else {
        s += ' ** ';
      }
    }
    s += '\n';
  }
  console.log(s);
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

function isInLoop(
  i: number,
  j: number,
  allPoints: [number, number, number][],
  width: number,
  height: number
): boolean {
  const level = isPointsInLoop(i, j, allPoints);
  if (level >= 0) {
    // console.log('check ', level, 'is in loop');
    return false;
  }
  // console.log('check ', i, j);
  let x1 = calcualteCrossNum(i, j, -1, 0, width, height, allPoints);
  let x2 = calcualteCrossNum(i, j, 1, 0, width, height, allPoints);
  let y1 = calcualteCrossNum(i, j, 0, 1, width, height, allPoints);
  let y2 = calcualteCrossNum(i, j, 0, -1, width, height, allPoints);

  // console.log(x1, x2);
  // console.log(x1 > 0 && x2 > 0);
  // console.log(y1, y2);
  // console.log(y2 > 0 && y2 > 0);

  if (x1 == 0 || x2 == 0 || y1 == 0 || y2 == 0) {
    return false;
  }

  if (x1 > 0 && x2 > 0 && (x1 % 2 === 1 || x2 % 2 === 1)) {
    // console.log('is in loop');
    return true;
  }

  if (y1 > 0 && y2 > 0 && (y1 % 2 === 1 || y2 % 2 === 1)) {
    // console.log('is in loop');
    return true;
  }
  return false;
}

function calcualteCrossNum(
  i: number,
  j: number,
  dx: number,
  dy: number,
  width: number,
  height: number,
  allPoints: [number, number, number][]
) {
  let count = 0;
  let sx = i;
  let sy = j;
  while (true) {
    sx += dx;
    sy += dy;
    if (sx < 0 || sx >= height || sy < 0 || sy >= width) {
      break;
    }
    if (isPointsInLoop(sx, sy, allPoints) >= 0) {
      count++;
    }
  }

  return count;
}

function isPointsInLoop(
  x: number,
  y: number,
  allPoints: [number, number, number][]
) {
  for (let [sx, sy, level] of allPoints) {
    if (x === sx && y === sy) {
      return level;
    }
  }
  return -1;
}

export async function day10b(dataPath?: string) {
  const data = await readData(dataPath);
  let sx = 0;
  let sy = 0;
  let allPoints: [number, number, number][] = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] === 'S') {
        sx = i;
        sy = j;
        allPoints = getAllPointsInLoop(sx, sy, data);
        dump(data, allPoints);
        break;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    let count = 0;
    for (let j = 0; j < data[i].length; j++) {
      if (isInLoop(i, j, allPoints, data[0].length, data.length)) {
        sum++;
        count++;
      }
    }
    console.log('line:', i, count);
  }

  return sum;
}

const answer = await day10b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
