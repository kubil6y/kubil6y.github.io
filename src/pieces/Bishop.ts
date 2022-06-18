import { BasePiece } from "./BasePiece";

export abstract class Bishop extends BasePiece {
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
