import { BasePiece } from "../BasePiece";

export class BlackPawn extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 1,
      imgOffsetX: 9,
      imgOffsetY: 12,
    };
  }
}
