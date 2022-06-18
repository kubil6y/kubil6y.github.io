import { BasePiece } from "../BasePiece";

export class WhiteQueen extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 1,
      imgH: 0,
      imgOffsetX: 14,
      imgOffsetY: 14.5,
    };
  }
}
