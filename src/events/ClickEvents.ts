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

      // TODO deneme: trying to set possible moves on the board
      this.board.possibleMoves =
        this.board.currentSelectedCell.currentPiece?.getValidMoves(
          this.board.cells
        ) || [];
    } else if (this.board.currentSelectedCell && !this.board.nextSelectedCell) {
      // Selecting nextSelectedCell
      this.board.nextSelectedCell = cell;
      // TODO after selecting nextSelectedCell remove possible moves;
      this.board.possibleMoves = [];
    }
  };
}
