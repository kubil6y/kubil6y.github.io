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

  public drawRect = (color?: string): void => {
    if (color) {
      this.canvas.ctx.fillStyle = color;
    } else {
      this.canvas.ctx.fillStyle = this.color;
    }
    this.canvas.ctx.fillRect(this.x, this.y, this.size, this.size);
  };

  public drawStroke = (color?: string, thickness?: number): void => {
    if (color) {
      this.canvas.ctx.strokeStyle = color;
    } else {
      this.canvas.ctx.strokeStyle = this.color;
    }

    if (thickness) {
      this.canvas.ctx.lineWidth = thickness;
    }

    this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
  };

  public drawText = (): void => {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.font = `${this.size}px arial`;
    this.canvas.ctx.fillText(Whites.KING, this.x, this.y);
    this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
  };
}
