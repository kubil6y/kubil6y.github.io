import { ImageReader } from "./ImageReader";
import { IPieceInput, Pawn } from "./pieces/Pawn";
import { canvas, board } from "./setup";

board.initCells();
board.draw();

const boardCell = board.cells[0][0];
console.log(boardCell);

const pawnSize = boardCell.size * 0.8;
const pawnInput: IPieceInput = {
  name: "pawn1",
  canvas,
  x: boardCell.center.x - pawnSize / 2,
  y: boardCell.center.y - pawnSize / 2,

  // x: boardCell.center.x - pawnSize / 2.8,
  // y: boardCell.center.y + pawnSize / 2.8,

  size: pawnSize,
  color: "black",
};

const pawn = new Pawn(pawnInput);
pawn.drawText();

const reader = new ImageReader();
reader.draw(canvas);
