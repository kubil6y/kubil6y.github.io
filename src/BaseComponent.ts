import { Canvas } from "./Canvas";
import { Whites } from "./utils/UnicodeCharacters";

export interface IBaseComponentInput {
  name: string;
  canvas: Canvas;
  x: number;
  y: number;
  size: number;
  color: string;
}

export abstract class BaseComponent {
  public canvas: Canvas;
  public x: number;
  public y: number;
  public size: number;
  public color: string;

  constructor(public attr: IBaseComponentInput) {
    this.canvas = this.attr.canvas;
    this.x = this.attr.x;
    this.y = this.attr.y;
    this.size = this.attr.size;
    this.color = this.attr.color;
  }

  public drawRect = (): void => {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  public drawText = (): void => {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.font = `${this.size}px arial`;
    this.canvas.ctx.fillText(Whites.KING, this.x, this.y);
    this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
  };
}
