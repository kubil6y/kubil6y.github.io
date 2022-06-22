import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class BlackPawn extends Pawn {
  public unicode: string = UnicodeCharacters.Black.Pawn;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    return true;
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const result = CellHelper.Get45DegreeCellsIfEmptyFromIndex(cells, i, j);
    return result;
  };

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 1,
      imgOffsetX: 9,
      imgOffsetY: 11,
    };
  }
}
