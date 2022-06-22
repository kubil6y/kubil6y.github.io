import { Cell } from "../Cell";
import { CellHelper } from "../utils/CellHelper";
import { BasePiece } from "./BasePiece";

export abstract class Queen extends BasePiece {
  public pointsValue: number = 9;
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
    const { i, j } = CellHelper.NameToIndex(this.currentPosition);
    const moves45 = CellHelper.Get45DegreeCellsIfEmptyFromIndex(cells, i, j);
    const result: Cell[] = [...moves45];
    const moves90 = CellHelper.Get90DegreeCellsIfEmptyFromIndex(cells, i, j);
    moves90.forEach((cell) => {
      if (!result.includes(cell)) {
        result.push(cell);
      }
    });
    return result;
  };
}
