import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class WhitePawn extends Pawn {
  public unicode: string = UnicodeCharacters.White.Pawn;

  public isValidMove = (cells: Cell[][], nextCell: Cell): boolean => {
    if (this.isPinned) return false;

    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const validCells = this.getValidMoves(cells);
    var result = validCells.includes(nextCell);
    console.log({ validCells, result });

    return result;
  };

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const result = CellHelper.Get90DegreeCellsIfEmptyFromIndex(cells, i, j);
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
      imgH: 0,
      imgOffsetX: 9,
      imgOffsetY: 13,
    };
  }
}
