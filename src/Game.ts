import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { EventRunner } from "./events/EventRunner";
import { InformationService } from "./InformationService";

export class Game {
  public board = new Board(this.canvas);
  private _eventRunner = new EventRunner(this.board);
  private _informationService = new InformationService(this);

  constructor(public canvas: Canvas) {}

  public init = () => {
    this.board.init();
  };

  public draw = () => {
    this.board.draw();
    this._informationService.update();
    this.board.listenForMoves();
  };

  // public play = () => {};
  // public generatePieces = () => {};
}
