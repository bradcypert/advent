async function part1() {
  const l1 = [];
  const l2 = [];

  const decoder = new TextDecoder("utf-8");
  const input = await Deno.readFile("./input.txt");
  const lines = decoder.decode(input).split("\n");
  for (const line of lines) {
    const [l, r] = line.split("   ");
    l1.push(l);
    l2.push(r);
  }

  l1.sort();
  l2.sort();

  let total = 0;
  for (let i = 0; i < l1.length; i++) {
    console.log(l1[i], l2[i]);
    const value = parseInt(l1[i]) - parseInt(l2[i]);
    total += Math.abs(value);
  }

  console.log(total);
  return;
}

async function part2() {
  const l1 = [];
  const l2: Array<string> = [];
  const occurances = new Map<number, number>();

  const decoder = new TextDecoder("utf-8");
  const input = await Deno.readFile("./input.txt");
  const lines = decoder.decode(input).split("\n");
  for (const line of lines) {
    const [l, r] = line.split("   ");
    l1.push(l);
    l2.push(r);
  }

  const m = l1.reduce((acc, cur) => {
    const v = parseInt(cur);
    if (!occurances.get(v)) {
        occurances.set(v, 0);
    }

    const o = l2.filter((item) => parseInt(item) === v).length;
    occurances.set(v, (occurances.get(v) ?? 0) + (v * o));
    return acc;
  }, occurances);

  console.log(m);

  console.log(m.values().reduce((acc, cur) => acc + cur, 0)); 
  return;
}

await part1();
await part2();