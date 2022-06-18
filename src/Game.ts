import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { EventRunner } from "./events/EventRunner";

export class Game {
  public board = new Board(this.canvas);
  public _eventRunner = new EventRunner(this.board);

  constructor(public canvas: Canvas) {}

  public init = () => {
    this.board.init();
  };

  public draw = () => {
    this.board.draw();
  };

  public play = () => {};

  public generatePieces = () => {};
}
