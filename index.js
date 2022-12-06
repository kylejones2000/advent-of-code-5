import { promises as fs } from 'fs';

const calculatePosition = (strPos) => ((strPos - 1) / 4) + 1;

const readFile = async (fileName) => {
    const data = await fs.readFile(fileName, 'utf8');
    return Buffer.from(data).toString();
}

const isLetter = (str) => str.match(/[A-Z]/);
const getNumbers = (str) => str.match(/\d+/g);

const stacks = {};

const data = await readFile('input.txt');

const lines = data.split('\n');

lines.forEach(line => {
    if (line.startsWith('move')) {
        const instructions = getNumbers(line);

        const crateNumber = instructions[0];
        const cratesFrom = stacks[instructions[1]];
        const cratesTo = stacks[instructions[2]];

        const splicePosition = cratesFrom.length - crateNumber;
        const stacksToMove = cratesFrom.splice(splicePosition, crateNumber);
        cratesTo.push(...stacksToMove);
    } else {
        // Data load
        [...line].forEach((c, i) => {
            if (isLetter(c)) {
                const position = calculatePosition(i);
                if (stacks.hasOwnProperty(position)) {
                    stacks[position] = [c, ...stacks[position]];
                } else {
                    stacks[position] = [c];
                }
            }
        });
    }

});

let result = '';
for (const stack in stacks) {
    result += stacks[stack].pop();
}

console.log(result);