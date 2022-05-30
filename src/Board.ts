import { Canvas } from "./Canvas";
import { Cell } from "./Cell";
import { Globals } from "./Globals";

export class Board {
  private _canvas: Canvas;
  private _cells: Cell[] = [];

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

  private initCells = (): void => {
    return;
  };
}
