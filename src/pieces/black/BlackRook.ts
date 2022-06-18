import { Rook } from "../Rook";

export class BlackRook extends Rook {
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
