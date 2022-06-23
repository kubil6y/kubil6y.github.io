import { BaseComponent } from "./BaseComponent";
import { Canvas } from "./Canvas";
import { BasePiece } from "./pieces/BasePiece";

export class Cell extends BaseComponent {
  public currentPiece: BasePiece | null = null;
  constructor(
    public name: string,
    public canvas: Canvas,
    public x: number,
    public y: number,
    public size: number,
    public color: string
  ) {
    super(name, canvas, x, y, size, color);
  }

  get center(): { x: number; y: number } {
    const x = this.x + this.size / 2;
    const y = this.y + this.size / 2;
    return { x, y };
  }

  public drawCircle = (
    ctx: CanvasRenderingContext2D,
    radius: number,
    color: string
  ) => {
    ctx.beginPath();
    const { x, y } = this.center;
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  };

  public setCurrentPiece(piece: BasePiece) {
    this.currentPiece = piece;
  }
}
