 
function generateMap(input: string): string[][] {
    return input.split("\n").map((line) => line.split(""));
}

  function part1(map: string[][]){
    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    let direction = 0;
    const startRow = map.findIndex((row) => row.includes("^"));
    const startColumn = map[startRow].indexOf("^");
    let pos = [startRow, startColumn];
    const visitedLocations = new Set();

    while (true) {
        visitedLocations.add(JSON.stringify(pos));
        const [row, col] = pos;
        const [dRow, dCol] = dirs[direction];
        const next = [row + dRow, col + dCol];
        if (next[0] < 0 || next[0] >= map.length || next[1] < 0 || next[1] >= map[0].length) {
            return visitedLocations.size;
        }

        const [nextRow, nextColumn] = next;
        if (map[nextRow][nextColumn] === "#") {
            direction = direction + 1;
            if (direction >= dirs.length) {
                direction = 0;
            }
            continue;
        }

        pos = next;
    }
  }

  
  
  function part2(map: string[][]){
    const dirs = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1]
    ];

    let direction = 0;
    let obstructions = 0;
    const startRow = map.findIndex((row) => row.includes("^"));
    const startColumn = map[startRow].indexOf("^");
    let pos = [startRow, startColumn];
    const visitedLocations = new Set();

    while (true) {
        visitedLocations.add(JSON.stringify(pos));
        const [row, col] = pos;
        const [dRow, dCol] = dirs[direction];
        const next = [row + dRow, col + dCol];
        if (next[0] < 0 || next[0] >= map.length || next[1] < 0 || next[1] >= map[0].length) {
            return visitedLocations.size;
        }

        const [nextRow, nextColumn] = next;
        if (map[nextRow][nextColumn] === "#") {
            direction = direction + 1;
            if (direction >= dirs.length) {
                direction = 0;
            }
            continue;
        }

        pos = next;
    }
  }
  
  const input = await Deno.readTextFile("./input.txt");
  const generatedMap = generateMap(input);
  console.log(part1(generatedMap));
  console.log(part2(generatedMap));
  
  