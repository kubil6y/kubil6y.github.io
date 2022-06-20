import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Queen } from "../Queen";

export class BlackQueen extends Queen {
  public unicode: string = UnicodeCharacters.Black.Queen;

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
