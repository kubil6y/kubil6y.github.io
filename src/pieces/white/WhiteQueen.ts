import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Queen } from "../Queen";

export class WhiteQueen extends Queen {
  public unicode: string = UnicodeCharacters.White.Queen;

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 1,
      imgH: 0,
      imgOffsetX: 14,
      imgOffsetY: 14.5,
    };
  }
}
