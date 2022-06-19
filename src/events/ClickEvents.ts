import { Board } from "../Board";
import { Cell } from "../Cell";

export class ClickEvents {
  public board: Board;
  constructor(board: Board) {
    this.board = board;

    window.addEventListener("click", (event) => {
      const cell = this.board.getCellByCoordinates(event.x, event.y);
      this.handleSelectingCells(cell);
    });
  }

  // FIXME shit function
  public handleSelectingCells = (cell: Cell | undefined) => {
    if (!cell) return;
    if (
      cell.currentPiece &&
      this.board.currentPlayer === cell.currentPiece.color &&
      !this.board.nextSelectedCell
    ) {
      // selecting first piece
      this.board.currentSelectedCell = cell;
    }

    // TODO is move valid?

    if (
      !cell.currentPiece &&
      this.board.currentSelectedCell &&
      !this.board.nextSelectedCell
    ) {
      console.log("lkjasfd"); // TODO
      this.board.nextSelectedCell = cell;
      // this.board.currentSelectedCell = null;
      // this.board.nextSelectedCell = null;
    }
  };
}

/*
      const cell = this.board.getCellByCoordinates(event.x, event.y);
      if (
        cell &&
        cell.currentPiece &&
        this.board.currentPlayer === cell.currentPiece.color
      ) {
        this.board.currentSelectedCell = cell;
        console.log(cell); 
      }

*/
