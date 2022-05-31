import { BaseComponent } from "../BaseComponent";
import { Canvas } from "../Canvas";

export abstract class BasePiece extends BaseComponent {
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
}
