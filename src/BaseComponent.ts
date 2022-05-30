import { Canvas } from "./Canvas";

export abstract class BaseComponent {
  constructor(
    public canvas: Canvas,
    public x: number,
    public y: number,
    public size: number,
    public color: string
  ) {}

  public draw = (): void => {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.fillRect(this.x, this.y, this.size, this.size);
  };
}
