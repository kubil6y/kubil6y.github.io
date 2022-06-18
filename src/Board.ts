import { Canvas } from "./Canvas";
import { Cell } from "./Cell";
import { Pawn } from "./pieces/Pawn";
import { CellHelper } from "./utils/CellHelper";
import { Globals } from "./utils/Globals";

export class Board {
  private _canvas: Canvas;
  public cells: Cell[][] = [];

  constructor(canvas: Canvas) {
    this._canvas = canvas;
  }

  // length % 8 must be 0
  get length(): number {
    const l =
      Math.min(this._canvas.c.width, this._canvas.c.height) *
      Globals.BOARD_TO_WINDOW_RATIO;

    const remaining = l % 8;
    return l - remaining;
  }

  get startX(): number {
    return (window.innerWidth - this.length) / 2;
  }

  get startY(): number {
    return (window.innerHeight - this.length) / 2;
  }

  get cellSize(): number {
    return this.length / 8;
  }

  public getCellAtPosition = (position: string) => {
    const { i, j } = CellHelper.NameToIndex(position);
    return this.getCellAtIndex(i, j);
  };

  public getCellAtIndex = (i: number, j: number) => {
    return this.cells[i][j];
  };

  public initCells = (): void => {
    for (let i = 0; i < 8; i++) {
      let arr: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        const x = this.startX + j * this.cellSize;
        const y = this.startY + i * this.cellSize;
        const color = (i + j) % 2 === 0 ? "white" : "tomato";
        const name = CellHelper.IndexToName(i, j);

        arr.push(new Cell(name, this._canvas, x, y, this.cellSize, color));
      }
      this.cells.push(arr);
    }
  };

  public setInitialPositions = () => {
    const { white, black } = CellHelper.GetInitialPositions();

    // White pieces
    white.pawns.forEach((pos, index) => {
      const cell = this.getCellAtPosition(pos);
      const name = `white:${index}`;
      cell.currentPiece = new Pawn(
        this,
        pos,
        pos,
        name,
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    // black pieces
    black.pawns.forEach((pos, index) => {
      const cell = this.getCellAtPosition(pos);
      const name = `black:${index}`;
      cell.currentPiece = new Pawn(
        this,
        pos,
        pos,
        name,
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });
  };

  public init = () => {
    this.initCells();
    this.setInitialPositions();
  };

  public draw = (): void => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.cells[i][j].drawRect();

        const cell = this.getCellAtIndex(i, j);
        if (cell.currentPiece) {
          cell.currentPiece.draw();
          // console.log(cell.center);
        }
      }
    }
  };
}
