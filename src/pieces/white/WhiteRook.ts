import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Rook } from "../Rook";

export class WhiteRook extends Rook {
  public unicode: string = UnicodeCharacters.White.Rook;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const moves = CellHelper.Get90DegreeCellsIfEmptyFromIndex(
      "white",
      cells,
      i,
      j
    );
    return moves;
  };

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
