import { Canvas } from "./Canvas";
import { Whites } from "./utils/UnicodeCharacters";

export abstract class BaseComponent {
  constructor(
    public name: string,
    public canvas: Canvas,
    public x: number,
    public y: number,
    public size: number,
    public color: string
  ) {}

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
