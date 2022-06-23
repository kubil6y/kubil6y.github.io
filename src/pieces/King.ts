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

    // from white's perspective
    const table = [
      {
        name: "up",
        x: i - 1,
        y: j,
      },
      {
        name: "down",
        x: i + 1,
        y: j,
      },
      {
        name: "left",
        x: i,
        y: j - 1,
      },
      {
        name: "right",
        x: i,
        y: j + 1,
      },

      {
        name: "top-right",
        x: i - 1,
        y: j + 1,
      },
      {
        name: "top-left",
        x: i - 1,
        y: j - 1,
      },
      {
        name: "bottom-right",
        x: i + 1,
        y: j + 1,
      },
      {
        name: "bottom-left",
        x: i + 1,
        y: j - 1,
      },
    ];

    table.forEach(({ x, y }) => {
      if (CellHelper.IsCellValid(x, y)) {
        if (cells[x][y].currentPiece === null) {
          result.push(cells[x][y]);
        } else {
          if (cells[x][y].currentPiece?.color !== this.color) {
            result.push(cells[x][y]);
          }
        }
      }
    });

    return result;
  };
}
