import { BasePiece } from "../BasePiece";

export class WhiteKing extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 0,
      imgH: 0,
      imgOffsetX: 15,
      imgOffsetY: 13,
    };
  }
}
