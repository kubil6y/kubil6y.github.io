import { Cell } from "../Cell";
import { CellHelper } from "../utils/CellHelper";
import { BasePiece } from "./BasePiece";

export abstract class Knight extends BasePiece {
  public pointsValue: number = 3;
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

    const moves = CellHelper.GetLMovementCellsFromIndex(cells, i, j);

    return moves.filter((cell) => cell.currentPiece?.color !== this.color);
  };
}
