import { Cell } from "../../Cell";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { King } from "../King";

export class WhiteKing extends King {
  public unicode: string = UnicodeCharacters.White.King;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    return true;
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    return [];
  };

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 0,
      imgH: 0,
      imgOffsetX: 15,
      imgOffsetY: 13,
    };
  }
}
