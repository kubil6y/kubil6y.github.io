import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class WhitePawn extends Pawn {
  public unicode: string = UnicodeCharacters.White.Pawn;

  public isValidMove = (cells: Cell[][], nextCell: Cell): boolean => {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  };

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const result: Cell[] = [];

    if (!this.hasMoved) {
      if (cells[i - 2][j].currentPiece === null) {
        result.push(cells[i - 2][j]);
      }
    }

    if (
      CellHelper.IsCellValid(i - 1, j) &&
      cells[i - 1][j].currentPiece === null
    ) {
      result.push(cells[i - 1][j]);
    }

    if (
      CellHelper.IsCellValid(i - 1, j - 1) &&
      cells[i - 1][j - 1].currentPiece !== null &&
      cells[i - 1][j - 1].currentPiece?.color !== this.color
    ) {
      result.push(cells[i - 1][j - 1]);
    }

    if (
      CellHelper.IsCellValid(i - 1, j + 1) &&
      cells[i - 1][j + 1].currentPiece !== null &&
      cells[i - 1][j + 1].currentPiece?.color !== this.color
    ) {
      result.push(cells[i - 1][j + 1]);
    }

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
