import { BasePiece } from "../BasePiece";

export class BlackKing extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 0,
      imgH: 1,
      imgOffsetX: 15,
      imgOffsetY: 11,
    };
  }
}
