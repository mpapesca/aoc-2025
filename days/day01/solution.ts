// Advent of Code 2025 - Day 1 Solution

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIAL_SIZE = 100;
const USE_SAMPLE = false as const;
const TEXT_FILE = USE_SAMPLE ? 'sample.txt' : 'input.txt' as const;
const input = fs.readFileSync(path.join(__dirname, TEXT_FILE), 'utf8');

console.log("Day 1 Solution");

const getNextPosition = (currentPosition: number, move: string) => {
  if (!['L', 'R'].includes(move[0])) {
    throw new Error(`Invalid move (${move}) direction: ${move[0]}`);
  }
  const isClockwise = move.slice(0, 1) === 'R';
  const rotationString = move.slice(1);
  const rotation = parseInt(rotationString, 10);
  if (isNaN(rotation) || rotation < 0) {
    throw new Error(`Invalid move (${move}) value: ${rotationString}`);
  }

  let crossedOriginCount = 0;
  if (currentPosition !== 0 || rotation >= DIAL_SIZE) {  
    const limit = currentPosition === 0 ? (
      DIAL_SIZE
    ) : (
      !isClockwise ? currentPosition : DIAL_SIZE - currentPosition
    );
    if (rotation >= limit) {
      const round = (rotation % DIAL_SIZE) >= limit ? Math.ceil : Math.floor;
      crossedOriginCount += round(rotation / DIAL_SIZE);
    }
  }

  const positionChange = isClockwise ? rotation : (rotation * -1);
  const newPosition = currentPosition + positionChange;

  let normalizedNewPosition = newPosition % DIAL_SIZE;
  if (normalizedNewPosition < 0) {
    normalizedNewPosition += DIAL_SIZE;
  }

  return {
    nextPosition: normalizedNewPosition,
    crossedOriginCount,
  };
};


const partOne = () => {
  const moves = input.split('\n');
  // Starting at 50.
  let position = 50;
  let zeroCount = 0;
  for(let move of moves) {
    const { nextPosition } = getNextPosition(position, move);
    if (nextPosition === 0) {
      zeroCount += 1;
    }
    position = nextPosition;
  }

  return zeroCount;
};

const partTwo = () => {
  const moves = input.split('\n');
  // Starting at 50.
  let position = 50;
  let clickCount = 0;
  for(let move of moves) {
    const { nextPosition, crossedOriginCount } = getNextPosition(position, move);

    console.log(`Moved ${move} from ${position} to ${nextPosition} which did${crossedOriginCount ? '' : ' not'} click${crossedOriginCount ? ` ${crossedOriginCount} times`: ''}.`);
    if (crossedOriginCount) {
      console.log(`Click count change: ${clickCount} + ${crossedOriginCount} = ${clickCount + crossedOriginCount}`);
    }
    clickCount += crossedOriginCount;
    position = nextPosition;
  }

  return clickCount;
}

console.log({
  partOne: partOne(),
  partTwo: partTwo(),
});
