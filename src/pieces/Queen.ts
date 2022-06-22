import { Cell } from "../Cell";
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
    return true;
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    return [];
  };
}
