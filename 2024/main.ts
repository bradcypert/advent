const l1 = [];
const l2 = [];

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile("./1/input.txt")
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