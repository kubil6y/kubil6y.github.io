import { BasePiece } from "./BasePiece";

export abstract class Queen extends BasePiece {
  public pointsValue: number = 9;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
