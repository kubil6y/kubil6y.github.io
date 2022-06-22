import { Cell } from "../Cell";
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
    return true;
  }

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    return [];
  };
}
