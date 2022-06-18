import { BasePiece } from "../BasePiece";

export class BlackKnight extends BasePiece {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 3,
      imgH: 1,
      imgOffsetX: 10.5,
      imgOffsetY: 12,
    };
  }
}
