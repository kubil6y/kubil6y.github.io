import { Board } from "../Board";

export class ClickEvents {
  public board: Board;
  constructor(board: Board) {
    this.board = board;

    window.addEventListener("click", (event) => {
      const cell = this.board.getCellByCoordinates(event.x, event.y);
      if (cell && cell.currentPiece) {
        this.board.currentSelectedCell = cell;
        console.log(cell);
      }
    });
  }
}
