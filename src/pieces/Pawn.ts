import { BaseComponent, IBaseComponentInput } from "../BaseComponent";
import { Canvas } from "../Canvas";

export interface IPieceInput extends IBaseComponentInput {}

export class Pawn extends BaseComponent {
  constructor(public attr: IPieceInput) {
    super(attr);
  }
}
