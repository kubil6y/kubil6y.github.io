import { BasePiece } from "../BasePiece";

export class WhiteKnight extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 3,
      imgH: 0,
      imgOffsetX: 10.5,
      imgOffsetY: 13,
    };
  }
}
