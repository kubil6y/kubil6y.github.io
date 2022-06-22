import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Rook } from "../Rook";

export class BlackRook extends Rook {
  public unicode: string = UnicodeCharacters.Black.Rook;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const moves = CellHelper.Get90DegreeCellsIfEmptyFromIndex(
      "black",
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
      imgH: 1,
      imgOffsetX: 9.5,
      imgOffsetY: 12,
    };
  }
}
