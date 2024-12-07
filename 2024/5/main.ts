function getRulesAndUpdates(input: string): [number[][], number[][]] {
  const [orderingRules, updates] = input.split("\n\n");
  const rules = orderingRules.split("\n").map((e) => {
    return e.split("|").map(Number);
  });

  const changes = updates.split("\n").map((e) => {
    return e.split(",").map(Number);
  });

  return [rules, changes];
}

function isChangeCorrect(orderingRules: number[][], change: number[]): boolean {
  return !orderingRules.some(([a, b]) => {
    return change.includes(a) &&
      change.includes(b) &&
      change.indexOf(a) > change.indexOf(b);
  });
}

function part1(orderingRules: number[][], changes: number[][]) {
  return changes.reduce((acc, cur) => {
    return (
      acc +
      (isChangeCorrect(orderingRules, cur)
        ? cur[Math.floor(cur.length / 2)]
        : 0)
    );
  }, 0);
}

function correctChange(orderingRules: number[][], change: number[]) {
    while(!isChangeCorrect(orderingRules, change)) {
        orderingRules.forEach(([a, b]) => {
            const iA = change.indexOf(a);
            const iB = change.indexOf(b);
            if (iA > -1 && iB > -1) {
                if (iA > iB) {
                    [change[iA], change[iB]] = [
                        change[iB],
                        change[iA]
                    ]
                }
            }
        });
    }

    return change;
  }
  


function part2(orderingRules: number[][], changes: number[][]) {
    return changes.reduce((acc, cur) => {
        return acc + (isChangeCorrect(orderingRules, cur) ? 0 : correctChange(orderingRules, cur)[Math.floor(cur.length / 2)]);
    }, 0)
}

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile("./input.txt");
const contents = decoder.decode(input);
const [r, c] = getRulesAndUpdates(contents);
console.log(part1(r, c));
console.log(part2(r, c));

