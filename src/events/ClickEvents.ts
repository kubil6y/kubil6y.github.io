import { Board } from "../Board";
import { Cell } from "../Cell";

export class ClickEvents {
  public board: Board;
  constructor(board: Board) {
    this.board = board;

    window.addEventListener("click", (event) => {
      const cell = this.board.getCellByCoordinates(event.x, event.y);
      if (cell) {
        this.handleSelectingCells(cell);
      }
    });
  }

  public handleSelectingCells = (cell: Cell) => {
    if (
      cell.currentPiece &&
      this.board.currentPlayer === cell.currentPiece.color &&
      !this.board.nextSelectedCell
    ) {
      // Selecting currentSelectedCell
      this.board.currentSelectedCell = cell;
    } else if (
      // !cell.currentPiece &&
      this.board.currentSelectedCell &&
      !this.board.nextSelectedCell
    ) {
      // Selecting nextSelectedCell
      this.board.nextSelectedCell = cell;
    }
  };
}
