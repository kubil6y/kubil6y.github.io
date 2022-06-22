import { Cell } from "../Cell";
import { BasePiece } from "./BasePiece";

export abstract class Bishop extends BasePiece {
  public pointsValue: number = 3;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    return [];
  };

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    if (this.isPinned) return false;
    return true;
  }
}
