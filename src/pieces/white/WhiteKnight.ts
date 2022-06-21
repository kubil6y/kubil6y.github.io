import { Cell } from "../../Cell";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Knight } from "../Knight";

export class WhiteKnight extends Knight {
  public unicode: string = UnicodeCharacters.White.Knight;

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
      imgW: 3,
      imgH: 0,
      imgOffsetX: 10.5,
      imgOffsetY: 13,
    };
  }
}
