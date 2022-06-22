import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Bishop } from "../Bishop";

export class BlackBishop extends Bishop {
  public unicode: string = UnicodeCharacters.Black.Bishop;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const moves = CellHelper.Get45DegreeCellsIfEmptyFromIndex(
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
      imgW: 2,
      imgH: 1,
      imgOffsetX: 11.5,
      imgOffsetY: 12,
    };
  }
}
