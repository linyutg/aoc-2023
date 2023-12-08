import { readData } from '../../shared.ts';
import chalk from 'chalk';

type Hand = {
  hand: string;
  bid: number;
  level: number;
};

const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
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

<<<<<<< HEAD
function evaludateHand(hand: Hand) {
=======
function evaluateHand(hand: Hand) {
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60
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

  let numOfJ = 0;
  for (let [key, value] of cards) {
    if (key === 'J') {
      numOfJ = value;
      break;
    }
  }

<<<<<<< HEAD
  if (cards.length === 1 || numOfJ === 4) {
=======
  // AAAAA
  if (cards.length === 1) {
    hand.level = 7;
    return;
  }
  // JJJJ
  if (numOfJ === 4) {
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60
    hand.level = 7;
    return;
  }

<<<<<<< HEAD
  const [key1, value1] = cards[0];
  const [key2, value2] = cards[1];
=======
  const [, value1] = cards[0];
  const [, value2] = cards[1];
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60

  // JJJ
  if (numOfJ === 3) {
    // JJJ AA => AAAAA
<<<<<<< HEAD
    if (value1 === 2) {
=======
    if (value2 === 2) {
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60
      hand.level = 7;
    } else {
      // A B => AAAA B
      hand.level = 6;
    }
    return;
  }

  // JJ
  if (numOfJ === 2) {
    // AAA => AAAAA
    if (value1 === 3) {
      hand.level = 7;
      // AA B => AAAA B
    } else if (value1 === 2 && value2 === 2) {
      hand.level = 6;
    } else {
      // => AAA
      hand.level = 4;
    }

    return;
  }

  // J
  if (numOfJ === 1) {
    // AAAA
    if (value1 === 4) {
      hand.level = 7;
      // AAA
    } else if (value1 === 3) {
      hand.level = 6;
      // AA BB
    } else if (value1 === 2 && value2 === 2) {
      hand.level = 5;
      // AA
    } else if (value1 === 2) {
      hand.level = 4;
    } else {
      hand.level = 2;
    }
    return;
  }

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
<<<<<<< HEAD
=======

  return;
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60
}

export async function day7b(dataPath?: string) {
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
<<<<<<< HEAD
    evaludateHand(hand);
=======
    evaluateHand(hand);
>>>>>>> 8a7ed2ccc8d4eb618149b327839754f9faadff60
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

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += (i + 1) * hands[i].bid;
  }

  return sum;
}

const answer = await day7b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
