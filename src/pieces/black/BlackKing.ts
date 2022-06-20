import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { King } from "../King";

export class BlackKing extends King {
  public unicode: string = UnicodeCharacters.Black.King;

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 0,
      imgH: 1,
      imgOffsetX: 15,
      imgOffsetY: 11,
    };
  }
}
