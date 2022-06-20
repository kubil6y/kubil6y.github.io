import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Bishop } from "../Bishop";

export class WhiteBishop extends Bishop {
  public unicode: string = UnicodeCharacters.White.Bishop;

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 2,
      imgH: 0,
      imgOffsetX: 11.5,
      imgOffsetY: 14,
    };
  }
}
