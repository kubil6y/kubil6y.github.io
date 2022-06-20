import { Board } from "../Board";

export class ResizeEvents {
  public board: Board;
  constructor(board: Board) {
    this.board = board;

    // FIXME resize cells and piece positions
    window.addEventListener("resize", () => {
      this.board.canvas.c.width = window.innerWidth;
      this.board.canvas.c.height = window.innerHeight;
    });
  }
}
