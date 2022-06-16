import { Game } from "./Game";
import { canvas } from "./setup";
import { CellHelper } from "./utils/CellHelper";

const game = new Game(canvas);
game.init();

const { i, j } = CellHelper.NameToIndex("a2");

const cell = game._board.getCellAtIndex(i, j);

/*
board.initCells();
board.draw();

const a8 = board.cells[0][0];
a8.color = "violet";

const { i, j } = CellHelper.NameToIndex("e2");
const cell = board.cells[i][j];
cell.color = "violet";

// board.draw();
CellHelper.DrawCellNameToBoard("g7", board, canvas.ctx);

const pawnsInitialPositions: string[] = [];
const letters = "abcdefgh";
for (let i = 0; i < 8; i++) {
  const pos = letters[i] + "2";
  pawnsInitialPositions.push(pos);
}

function generatePawns(): Pawn[] {
  const cells: Pawn[] = [];
  for (let i = 0; i < letters.length; i++) {
    const pawn = new Pawn(
      board,
      `${letters[i]}2`,
      `${letters[i]}2`,
      "pawn2",
      canvas,
      cell.x,
      cell.y,
      cell.size,
      "white"
    );
    cells.push(pawn);
  }

  for (let i = 0; i < letters.length; i++) {
    const pawn = new Pawn(
      board,
      `${letters[i]}7`,
      `${letters[i]}7`,
      "pawn2",
      canvas,
      cell.x,
      cell.y,
      cell.size,
      "black"
    );
    cells.push(pawn);
  }
  return cells;
}

const pawns = generatePawns();
pawns.forEach((pawn) => pawn.draw());
console.log(pawns);
*/
