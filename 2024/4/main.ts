function isMatch(
  grid: Array<Array<string>>,
  target: string,
  row: number,
  column: number,
  targetRow: number,
  targetColumn: number
) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  for (let i = 0; i < target.length; i++) {
    const nextRow = row + targetRow * i;
    const nextColumn = column + targetColumn * i;
    if (
      nextRow < 0 ||
      nextColumn < 0 ||
      nextRow >= rowCount ||
      nextColumn >= colCount ||
      grid[nextRow][nextColumn] !== target[i]
    ) {
      return false;
    }
  }

  return true;
}

function part1(input: string) {
  const validMovements = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1],
  ];
  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));
  const target = "XMAS";
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [rc, cc] of validMovements) {
        if (isMatch(grid, target, r, c, rc, cc)) {
          count++;
        }
      }
    }
  }

  return count;
}

function isXMAS(grid: Array<Array<string>>, row: number, column: number) {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  const validMovements: Array<Array<[number, number, string]>> = [
    [
      [0, -1, "M"],
      [0, 1, "S"],
      [-1, 0, "A"],
      [-1, -2, "S"],
      [1, 0, "A"],
      [1, 2, "M"],
    ],
    [
      [0, -1, "S"],
      [0, 1, "M"],
      [-1, 0, "A"],
      [-1, -2, "M"],
      [1, 0, "A"],
      [1, 2, "S"],
    ],
  ];

  return validMovements.some((movement) =>
    movement.every(([movementRow, movementColumn, letter]) => {
      const nextRow = row + movementRow;
      const nextColumn = column + movementColumn;
      return (
        nextRow >= 0 &&
        nextColumn >= 0 &&
        nextRow < rowCount &&
        nextColumn < colCount &&
        grid[nextRow][nextColumn] === letter
      );
    })
  );
}

// TODO: THIS IS NOT CORRECT
function part2(input: string) {
  const lines = input.split("\n");
  const grid = lines.map((line) => line.split(""));
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let r = 1; r < rows - 1; r++) {
    for (let c = 1; c < cols - 1; c++) {
      if (isXMAS(grid, r, c)) {
        count++;
      }
    }
  }

  return count;
}

const decoder = new TextDecoder("utf-8");
const input = await Deno.readFile("./input.txt");
const contents = decoder.decode(input);
console.log(part1(contents));
console.log(part2(contents));
