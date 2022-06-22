import { Cell } from "../Cell";
import { CellHelper } from "../utils/CellHelper";
import { BasePiece } from "./BasePiece";

export abstract class Bishop extends BasePiece {
  public pointsValue: number = 3;
  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };
}
