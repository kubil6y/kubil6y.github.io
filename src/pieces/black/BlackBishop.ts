import { BasePiece } from "../BasePiece";

export class BlackBishop extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 2,
      imgH: 1,
      imgOffsetX: 11.5,
      imgOffsetY: 12,
    };
  }
}
