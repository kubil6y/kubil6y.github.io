import { BasePiece } from "../BasePiece";

export class BlackRook extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 4,
      imgH: 1,
      imgOffsetX: 9.5,
      imgOffsetY: 12,
    };
  }
}
