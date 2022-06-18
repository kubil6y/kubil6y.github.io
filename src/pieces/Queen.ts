import { BasePiece } from "./BasePiece";

export abstract class Queen extends BasePiece {
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
