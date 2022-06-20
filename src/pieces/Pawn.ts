import { BasePiece } from "./BasePiece";

export abstract class Pawn extends BasePiece {
  public pointsValue: number = 1;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
