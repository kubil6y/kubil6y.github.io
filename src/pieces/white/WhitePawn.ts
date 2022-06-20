import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class WhitePawn extends Pawn {
  public unicode: string = UnicodeCharacters.White.Pawn;

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 0,
      imgOffsetX: 9,
      imgOffsetY: 13,
    };
  }
}
