import { BasePiece } from "./BasePiece";

export abstract class Rook extends BasePiece {
  public pointsValue: number = 5;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
