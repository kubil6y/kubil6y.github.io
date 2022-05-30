import { BaseComponent } from "./BaseComponent";
import { Canvas } from "./Canvas";

export type TCellColor = "white" | "#7c7219cc";

export interface ICellInput {
  name: string;
  canvas: Canvas;
  x: number;
  y: number;
  size: number;
  // color: TCellColor;
  color: TCellColor;
}

export class Cell extends BaseComponent {
  public name: string;
  constructor(public input: ICellInput) {
    super(input.canvas, input.x, input.y, input.size, input.color);
    this.name = input.name;
  }

  get center(): { x: number; y: number } {
    const x = this.x + this.size / 2;
    const y = this.y + this.size / 2;
    return { x, y };
  }
}
