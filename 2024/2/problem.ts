function isSafe(report: number[]): boolean {
    const diff = report.slice(1).map((value, index) => value - report[index]);
    const allIncreasing = diff.every((diff) => diff > 0 && diff <= 3);
    const allDecreasing = diff.every((diff) => diff < 0 && diff >= -3);

    return allIncreasing || allDecreasing;
}

function canBecomeSafe(report: number[]): boolean {
    for (let i = 0; i < report.length; i++) {
        const modified = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafe(modified)) {
            return true;
        }
    }

    return false;
}


function part1(input: string) {
    const items = input.split("\n").map((item) => item.split(" "));
    return items.reduce((safeCount, reportLine) => {
        const report = reportLine.map(Number);
        if (isSafe(report)) {
            safeCount++;
        }

        return safeCount;
    }, 0);
}

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile("./input.txt");
const lines = decoder.decode(input);
console.log(part1(lines));



function part2(input: string) {
    const items = input.split("\n").map((item) => item.split(" "));
    return items.reduce((safeCount, reportLine) => {
        const report = reportLine.map(Number);
        if (isSafe(report) || canBecomeSafe(report)) {
            safeCount++;
        }

        return safeCount;
    }, 0);
  
}
  

console.log(part2(lines))
