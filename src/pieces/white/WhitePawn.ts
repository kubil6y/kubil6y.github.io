import { BasePiece } from "../BasePiece";

export class WhitePawn extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 0,
      imgOffsetX: 9,
      imgOffsetY: 12,
    };
  }
}
