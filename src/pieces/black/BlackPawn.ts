import { Pawn } from "../Pawn";

export class BlackPawn extends Pawn {
  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 1,
      imgOffsetX: 9,
      imgOffsetY: 11,
    };
  }
}
