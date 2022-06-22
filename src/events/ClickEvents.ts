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
      !this.board.attempedNextSelectedCell &&
      !this.board.nextSelectedCell
    ) {
      // Selecting currentSelectedCell
      this.board.currentSelectedCell = cell;

      const possibleMoves =
        this.board.currentSelectedCell.currentPiece?.getValidMoves(
          this.board.cells
        ) || [];

      this.board.setPossibleMoves(possibleMoves);
    } else if (this.board.currentSelectedCell && !this.board.nextSelectedCell) {
      // Selecting attempedNextSelectedCell
      this.board.attempedNextSelectedCell = cell;

      if (
        this.board.currentSelectedCell.currentPiece?.isValidMove(
          this.board.cells,
          cell
        )
      ) {
        // Selecting nextSelectedCell
        this.board.nextSelectedCell = cell;
        this.board.setPossibleMoves([]);
      }
    }
  };
}
