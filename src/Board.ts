import { Canvas } from "./Canvas";
import { Cell } from "./Cell";
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

  public initCells = (): void => {
    console.log("alternative init cells"); // TODO
    const letters = "abcdefgh";
    for (let i = 0; i < 8; i++) {
      let arr: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        const x = this.startX + i * this.cellSize;
        const y = this.startY + j * this.cellSize;
        const color = (i + j) % 2 === 0 ? "white" : "tomato";
        const name = CellHelper.IndexToName(i, j);

        arr.push(new Cell(name, this._canvas, x, y, this.cellSize, color));
      }
      this.cells.push(arr);
    }
  };

  public draw = (): void => {
    for (let i = 0; i < this.cells.length; i++) {
      for (let j = 0; j < this.cells[i].length; j++) {
        this.cells[i][j].drawRect();
      }
    }
  };
}
