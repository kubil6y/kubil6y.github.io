import { Cell, ICellInput } from "./Cell";
import { Globals } from "./Globals";
import { canvas, board } from "./setup";
// board.draw();

// const cell = new Cell("e2", canvas, 200, 200, 100, "orange");
// cell.draw();

console.log(board.length, board.cellSize, board.cellSize * 8);

const cells: Cell[] = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const x = board.startX + i * board.cellSize;
    const y = board.startY + j * board.cellSize;
    const cellInput: ICellInput = {
      name: "",
      canvas,
      x,
      y,
      size: board.cellSize,
      // color: (i + j) % 2 === 0 ? "white" : "#7c7219cc",
      color: (i + j) % 2 === 0 ? "white" : "#7c7219cc",
    };
    cells.push(new Cell(cellInput));
  }
}

cells.forEach((c) => c.draw());
cells.forEach((c) => {
  console.log(c.center.x, c.center.y);
});
