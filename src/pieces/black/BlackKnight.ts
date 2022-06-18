import { Knight } from "../Knight";

export class BlackKnight extends Knight {
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
