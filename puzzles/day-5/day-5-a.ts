import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Range = {
  destStart: number;
  sourceStart: number;
  length: number;
};

function inRange(range: Range, source: number): boolean {
  if (
    source >= range.sourceStart &&
    source < range.sourceStart + range.length
  ) {
    return true;
  }
  return false;
}

function convertToRange(range: Range, source: number): number {
  return range.destStart + source - range.sourceStart;
}

function parseRanges(rows: string[]): Range[][] {
  let ret: Range[][] = [];

  let range: Range[] = [];
  for (let row of rows) {
    if (row === '') {
      if (range.length > 0) {
        ret.push(range);
      }
      range = [];
      continue;
    }
    if (row.includes(':')) {
      continue;
    }
    const [destStart, sourceStart, length] = row.trim().split(' ').map(Number);
    range.push({
      destStart,
      sourceStart,
      length,
    });
  }

  if (range.length > 0) {
    ret.push(range);
  }

  return ret;
}

function parseSeeds(row: string): number[] {
  const [_, s2] = row.split(':');
  const ret = s2.trim().split(' ').map(Number);
  return ret;
}

function map(ranges: Range[][], seed: number): number {
  let start = seed;
  for (let rangeList of ranges) {
    for (let range of rangeList) {
      if (inRange(range, start)) {
        start = convertToRange(range, start);
        break;
      }
    }
  }
  return start;
}

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);

  const seeds = parseSeeds(data[0]);
  const ranges = parseRanges(data.slice(1));

  for (let i = 0; i < seeds.length; i++) {
    seeds[i] = map(ranges, seeds[i]);
  }

  return Math.min(...seeds);
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
