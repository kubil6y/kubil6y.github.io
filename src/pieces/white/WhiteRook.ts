import { BasePiece } from "../BasePiece";

export class WhiteRook extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 4,
      imgH: 0,
      imgOffsetX: 9.5,
      imgOffsetY: 13,
    };
  }
}
