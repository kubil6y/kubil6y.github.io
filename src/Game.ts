import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { EventRunner } from "./events/EventRunner";
import { InformationService } from "./InformationService";
import { BasePiece } from "./pieces/BasePiece";

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

  // TODO only for dev
  public printPiecesOnBoard = () => {
    interface IItem {
      position: string;
      piece: BasePiece | null;
    }

    const result: IItem[][] = [];

    for (let i = 0; i < 8; i++) {
      const arr: IItem[] = [];
      for (let j = 0; j < 8; j++) {
        const item: IItem = {
          position: this.board.cells[i][j].name,
          piece: this.board.cells[i][j].currentPiece,
        };
        arr.push(item);
      }
      result.push(arr);
    }

    console.log(result);
  };
}
