import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { BasePiece } from "./pieces/BasePiece";

export class Game {
  public _pieces: BasePiece[] = [];
  public _board = new Board(this._canvas);
  constructor(public _canvas: Canvas) {}

  public init = () => {
    this._board.draw();
  };

  public generatePieces = () => {};
}
