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

function isXMAS(
    grid: Array<Array<string>>,
    row: number,
    column: number
  ) {
    
    if (grid[row][column] === "A") {

        // M   M
        //   A  
        // S   S 
        const upperRight = grid[row-1][column+1];
        const upperLeft = grid[row-1][column-1];
        const lowerRight = grid[row+1][column+1];
        const lowerLeft = grid[row+1][column-1];
        let rtl = false;
        let ltr = false;
        if (upperRight == "M" && lowerLeft == "S") {
            rtl = true;
        } else if (upperRight == "S" && lowerLeft == "M") {
            rtl = true;
        }

        if (upperLeft == "M" && lowerRight == "S") {
            ltr = true;
        } else if (upperLeft == "S" && lowerRight == "M") {
            ltr = true;
        }

        return ltr && rtl;
    }
  
    return false;
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
