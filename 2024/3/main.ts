function part1(input: string) {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
    let totalSum = 0;

    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
        const left = parseInt(match[1], 10);
        const right = parseInt(match[2], 10);
        totalSum += left * right;
    }

    return totalSum;
}

function part2(input: string) {
    const mulPattern = "mul\\((\\d{1,3}),(\\d{1,3})\\)";
    const doPattern = "do\\(\\)";
    const dontPattern = "don't\\(\\)";
    const instructionPattern = `${mulPattern}|${doPattern}|${dontPattern}`;
    const instructionRegex = new RegExp(instructionPattern, "g");
    const mulRegex = new RegExp(mulPattern);

    let totalSum = 0;
    let enabled = true;

    const instructions = input.match(instructionRegex);

    if (instructions) {
        for (const instruction of instructions) {
            if (new RegExp(doPattern).test(instruction)) {
                enabled = true;
            } else if (new RegExp(dontPattern).test(instruction)) {
                enabled = false;
            } else if (enabled && mulRegex.test(instruction)) {
                const [, left, right] = instruction.match(mulRegex) ?? [];
                totalSum += parseInt(left) * parseInt(right);
            }
        }
    }

    return totalSum;
}

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile("./input.txt");
const contents = decoder.decode(input);
console.log(part1(contents));
console.log(part2(contents));


`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`