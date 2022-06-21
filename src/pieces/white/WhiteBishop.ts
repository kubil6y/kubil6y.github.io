import { Cell } from "../../Cell";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Bishop } from "../Bishop";

export class WhiteBishop extends Bishop {
  public unicode: string = UnicodeCharacters.White.Bishop;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    return true;
  }

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
