import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Rook } from "../Rook";

export class WhiteRook extends Rook {
  public unicode: string = UnicodeCharacters.White.Rook;

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 4,
      imgH: 0,
      imgOffsetX: 9.5,
      imgOffsetY: 13,
    };
  }
}
