import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Queen } from "../Queen";

export class WhiteQueen extends Queen {
  public unicode: string = UnicodeCharacters.White.Queen;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const moves45 = CellHelper.Get45DegreeCellsIfEmptyFromIndex(
      "white",
      cells,
      i,
      j
    );
    const result: Cell[] = [...moves45];
    const moves90 = CellHelper.Get90DegreeCellsIfEmptyFromIndex(
      "white",
      cells,
      i,
      j
    );
    moves90.forEach((cell) => {
      if (!result.includes(cell)) {
        result.push(cell);
      }
    });
    return result;
  };

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 1,
      imgH: 0,
      imgOffsetX: 14,
      imgOffsetY: 14.5,
    };
  }
}
