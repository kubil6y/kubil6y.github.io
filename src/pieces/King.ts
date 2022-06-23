import { Cell } from "../Cell";
import { ColorType } from "../types";
import { CellHelper } from "../utils/CellHelper";
import { BasePiece } from "./BasePiece";

export abstract class King extends BasePiece {
  public pointsValue: number = 999;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    const validMoves = this.getValidMoves(cells);
    return validMoves.includes(nextCell);
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    const result: Cell[] = [];
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);

    // FIXME holy shit make an array and loop over this shit logic

    // from white's perspective
    // going down
    if (CellHelper.IsCellValid(i - 1, j)) {
      if (cells[i - 1][j].currentPiece === null) {
        result.push(cells[i - 1][j]);
      } else {
        if (cells[i - 1][j].currentPiece?.color !== this.color) {
          result.push(cells[i - 1][j]);
        }
      }
    }

    // going up
    if (CellHelper.IsCellValid(i + 1, j)) {
      if (cells[i + 1][j].currentPiece === null) {
        result.push(cells[i + 1][j]);
      } else {
        if (cells[i + 1][j].currentPiece?.color !== this.color) {
          result.push(cells[i + 1][j]);
        }
      }
    }

    // going left
    if (CellHelper.IsCellValid(i, j - 1)) {
      if (cells[i][j - 1].currentPiece === null) {
        result.push(cells[i][j - 1]);
      } else {
        if (cells[i][j - 1].currentPiece?.color !== this.color) {
          result.push(cells[i][j - 1]);
        }
      }
    }

    // going right
    if (CellHelper.IsCellValid(i, j + 1)) {
      if (cells[i][j + 1].currentPiece === null) {
        result.push(cells[i][j + 1]);
      } else {
        if (cells[i][j + 1].currentPiece?.color !== this.color) {
          result.push(cells[i][j + 1]);
        }
      }
    }

    return result;
  };
}
