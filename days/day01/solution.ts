// Advent of Code 2025 - Day 1 Solution

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

console.log("Day 1 Solution");
type TMoveDirection = 'L' | 'R';

const getNextPosition = (currentPosition: number, move: string) => {
  if (!['L', 'R'].includes(move[0])) {
    throw new Error(`Invalid move (${move}) direction: ${move[0]}`);
  }
  const direction = move.slice(0, 1) as TMoveDirection;
  const rotationString = move.slice(1);
  const rotation = parseInt(rotationString, 10);
  if (isNaN(rotation) || rotation < 0) {
    throw new Error(`Invalid move (${move}) value: ${rotationString}`);
  }

  const positionChange = direction === 'R' ? rotation : (rotation * -1);
  const newPosition = currentPosition + positionChange;
  
  // 110 % 100 = 10
  // -20 % 100 = -20
  const normalizedNewPosition = newPosition % 100;
  console.log(`Processing move: ${move} -> moving ${positionChange} from ${currentPosition} to ${normalizedNewPosition}`);
  if (normalizedNewPosition < 0) {
    return 100 + normalizedNewPosition;
  }
  return normalizedNewPosition;
};

const moves = input.split('\n');
// Starting at 50.
let position = 50;
let zeroCount = 0;
for(let move of moves) {
  console.debug(`process: ${move}`);
  position = getNextPosition(position, move);
  console.log(`new position: ${position}`);
  if (position === 0) {
    zeroCount += 1;
  }
}

console.log({
  password: zeroCount,
});
