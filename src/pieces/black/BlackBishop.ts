import { Cell } from "../../Cell";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Bishop } from "../Bishop";

export class BlackBishop extends Bishop {
  public unicode: string = UnicodeCharacters.Black.Bishop;

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
      imgH: 1,
      imgOffsetX: 11.5,
      imgOffsetY: 12,
    };
  }
}
