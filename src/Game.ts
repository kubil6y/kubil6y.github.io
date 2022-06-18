import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { EventRunner } from "./events/EventRunner";

export class Game {
  public _eventRunner = new EventRunner(this._canvas);
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
