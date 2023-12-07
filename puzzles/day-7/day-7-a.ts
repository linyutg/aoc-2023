import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Hand = {
  hand: string;
  bid: number;
  level: number;
};

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
function compare(h1: Hand, h2: Hand) {
  for (let i = 0; i < 5; i++) {
    const index1 = cards.indexOf(h1.hand[i]);
    const index2 = cards.indexOf(h2.hand[i]);
    if (index1 < index2) {
      return 1;
    } else if (index1 > index2) {
      return -1;
    }
  }

  return 0;
}

function evaludateHand(hand: Hand) {
  const map = new Map<string, number>();
  for (let c of hand.hand) {
    if (!map.has(c)) {
      map.set(c, 1);
    } else {
      map.set(c, map.get(c) + 1);
    }
  }

  const cards = Array.from(map.entries());

  cards.sort(([key1, value1], [key2, value2]) => {
    return value2 - value1;
  });

  if (cards.length === 1) {
    hand.level = 7;
    return;
  }

  const [, value1] = cards[0];
  const [, value2] = cards[1];

  if (value1 === 4) {
    hand.level = 6;
  } else if (value1 === 3 && value2 === 2) {
    hand.level = 5;
  } else if (value1 === 3) {
    hand.level = 4;
  } else if (value1 === 2 && value2 === 2) {
    hand.level = 3;
  } else if (value1 === 2) {
    hand.level = 2;
  } else {
    hand.level = 1;
  }
}

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);

  let hands: Hand[] = [];
  for (let row of data) {
    const [s1, s2] = row.split(' ');
    hands.push({
      hand: s1,
      bid: Number(s2),
      level: 0,
    });
  }

  for (let hand of hands) {
    evaludateHand(hand);
  }

  hands.sort((h1, h2) => {
    if (h1.level > h2.level) {
      return 1;
    } else if (h1.level < h2.level) {
      return -1;
    } else {
      return compare(h1, h2);
    }
  });

  console.log(hands);

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += (i + 1) * hands[i].bid;
  }
  return sum;
}

const answer = await day7a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
