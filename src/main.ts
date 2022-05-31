import { BasePiece } from "./pieces/BasePiece";
import { canvas, board } from "./setup";
import { CellHelper } from "./utils/CellHelper";

board.initCells();
board.draw();

const a8 = board.cells[0][0];
a8.color = "violet";

const { i, j } = CellHelper.NameToIndex("e2");
const cell = board.cells[i][j];
cell.color = "violet";

board.draw();
CellHelper.DrawCellNameToBoard("g7", board, canvas.ctx);

const pawnsInitialPositions: string[] = [];
const letters = "abcdefgh";
for (let i = 0; i < 8; i++) {
  const pos = letters[i] + "2";
  pawnsInitialPositions.push(pos);
}

class Pawn extends BasePiece {}
const pawn = new Pawn(
  "e2",
  "e2",
  "pawn2",
  canvas,
  cell.x,
  cell.y,
  cell.size,
  "white"
);
pawn.draw();
