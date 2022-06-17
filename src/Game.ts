import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { BasePiece } from "./pieces/BasePiece";

export class Game {
  public _board = new Board(this._canvas);
  constructor(public _canvas: Canvas) {}

  public init = () => {
    this._board.init();
  };

  public draw = () => {
    this._board.draw();
  };

  public play = () => {};

  public generatePieces = () => {};
}
