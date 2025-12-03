// Advent of Code 2025 - Day 2 Solution
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIAL_SIZE = 100;
const USE_SAMPLE = false as const;
const TEXT_FILE = USE_SAMPLE ? 'sample.txt' : 'input.txt' as const;
const input = fs.readFileSync(path.join(__dirname, TEXT_FILE), 'utf8');

console.log("Day 2 Solution");

// TODO: Implement solution

const isInValidDouble = (id: string) => {
    if (id.length % 2 !== 0) {
        return false;
    }
    const halfLength = id.length / 2;
    const head = id.substring(0, halfLength);
    const tail = id.substring(halfLength);
    if (head === tail) {
        return true;
    }
    return false;
};

const partOne = () => {
    const ranges = input.split(',').map(range => range.trim().split('-'));
    const invalidIds = new Set<number>();
    for (let range of ranges) {
        const lower = parseInt(range[0]);
        const upper = parseInt(range[1]);
        for(let i = lower; i <= upper; i++) {
            if (isInValidDouble(i.toString())) {
                invalidIds.add(i)
            }
        }
    }

    let total = 0;
    invalidIds.forEach((id) => {  
        total += id;
    });
    return total;
}


const isInvalidRepeat = (id: string) => {
    if (id.length <= 1) {
        return false;
    }
    const limit = Math.floor(id.length / 2);
    for (let portionLength = limit; portionLength > 0; portionLength--) {
        if (id.length % portionLength === 0) {
            const portionCount = id.length / portionLength;
            const portions = [];
            for (let i = 0; i < portionCount; i++) {
                portions.push(id.substring(i * portionLength, (i+1) * portionLength))
            }
            let allMatching = true;
            let previousPortion: string | null = null;
            for (let portion of portions) {
                allMatching = allMatching && (!previousPortion || previousPortion === portion);
                previousPortion = portion;
            }
            if (allMatching) {
                
                console.log({portions, invalidId: id});
                return true;
            }
        }
    }

    return false;
};

const partTwo = () => {
    const ranges = input.split(',').map(range => range.trim().split('-'));
    const invalidIds = new Set<number>();
    for (let range of ranges) {
        const lower = parseInt(range[0]);
        const upper = parseInt(range[1]);
        for(let i = lower; i <= upper; i++) {
            if (isInvalidRepeat(i.toString())) {
                invalidIds.add(i)
            }
        }
    }

    let total = 0;
    invalidIds.forEach((id) => {  
        total += id;
    });
    return total;
}

console.log({
    partOne: partOne(),
    partTwo: partTwo(),
});
