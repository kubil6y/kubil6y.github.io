import { BaseComponent, IBaseComponentInput } from "./BaseComponent";
import { Canvas } from "./Canvas";

export type TCellColor = "white" | "#7c7219cc";

export interface ICellInput extends IBaseComponentInput {}

export class Cell extends BaseComponent {
  constructor(public attr: ICellInput) {
    super(attr);
  }

  get center(): { x: number; y: number } {
    const x = this.x + this.size / 2;
    const y = this.y + this.size / 2;
    return { x, y };
  }
}
