import { BasePiece } from "../BasePiece";

export class BlackQueen extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 1,
      imgH: 1,
      imgOffsetX: 14,
      imgOffsetY: 12,
    };
  }
}
