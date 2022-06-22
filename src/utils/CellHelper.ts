import { Board } from "../Board";
import { Cell } from "../Cell";
import { ColorType } from "../types";

export class CellHelper {
  public static IndexToName(i: number, j: number): string {
    // 0, 0 -> a8
    // 3, 2 -> b5
    const num = 8 - i;

    const letters = "abcdefgh";
    const char = letters[j];
    return char + num;
  }

  public static IsCellValid = (i: number, j: number): boolean => {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7;
  };

  public static NameToIndex(name: string): { i: number; j: number } {
    const letters = "abcdefgh";

    name = name.toLowerCase();
    if (name.length !== 2) throw new Error("Cell name must be length 2");

    const num = parseInt(name[1]);
    if (num > 8 || num < 1) throw new Error("Number must be between 1-8");

    const j = letters.indexOf(name[0]);

    const i = 8 - num;
    if (i === -1) throw new Error("valid letters {a,b,c,e,d,f,g,h}");

    return { i, j };
  }

  public static GetCellCenterByName(
    cells: Cell[][],
    name: string
  ): { x: number; y: number } {
    name = name.toLowerCase();
    const { i, j } = this.NameToIndex(name);
    return this.GetCellCenterByIndexes(cells, i, j);
  }

  public static GetCellCenterByIndexes(
    cells: Cell[][],
    i: number,
    j: number
  ): { x: number; y: number } {
    const cell = cells[i][j];
    return cell.center;
  }

  public static DrawCellNameToBoard(
    name: string,
    board: Board,
    ctx: CanvasRenderingContext2D
  ): void {
    name = name.toLowerCase();
    const fontSize = board.cellSize * 0.5;
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px arial`;
    const { x, y } = this.GetCellCenterByName(board.cells, name);
    ctx.fillText(name, x - fontSize / 2, y + fontSize / 4);
  }

  public static GetInitialPositions() {
    return {
      white: {
        pawns: ["a2", "b2", "c2", "e2", "d2", "f2", "g2", "h2"],
        rooks: ["a1", "h1"],
        knights: ["b1", "g1"],
        bishops: ["c1", "f1"],
        queen: "d1",
        king: "e1",
      },

      black: {
        pawns: ["a7", "b7", "c7", "e7", "d7", "f7", "g7", "h7"],
        rooks: ["a8", "h8"],
        knights: ["b8", "g8"],
        bishops: ["c8", "f8"],
        queen: "d8",
        king: "e8",
      },
    };
  }

  public static Get90DegreeCellsIfEmptyFromIndex = (
    fromColorType: ColorType,
    cells: Cell[][],
    i: number,
    j: number
  ): Cell[] => {
    const result: Cell[] = [];

    // going right
    let x = i + 1;
    while (x <= 7) {
      if (cells[x][j].currentPiece) {
        if (cells[x][j].currentPiece?.color !== fromColorType) {
          result.push(cells[x][j]);
        }
        break;
      } else {
        result.push(cells[x][j]);
      }
      x++;
    }

    // going left
    x = i - 1;
    while (x >= 0) {
      if (cells[x][j].currentPiece) {
        if (cells[x][j].currentPiece?.color !== fromColorType) {
          result.push(cells[x][j]);
        }
        break;
      } else {
        result.push(cells[x][j]);
      }
      x--;
    }

    // going top
    let y = j - 1;
    while (y >= 0) {
      if (cells[i][y].currentPiece) {
        if (cells[i][y].currentPiece?.color !== fromColorType) {
          result.push(cells[i][y]);
        }
        break;
      } else {
        result.push(cells[i][y]);
      }
      y--;
    }

    y = j + 1;
    while (y <= 7) {
      if (cells[i][y].currentPiece) {
        if (cells[i][y].currentPiece?.color !== fromColorType) {
          result.push(cells[i][y]);
        }
        break;
      } else {
        result.push(cells[i][y]);
      }
      y++;
    }

    return result;
  };

  public static Get45DegreeCellsIfEmptyFromIndex = (
    fromColorType: ColorType,
    cells: Cell[][],
    i: number,
    j: number
  ): Cell[] => {
    const result: Cell[] = [];

    // going top-right
    let x = i - 1;
    let y = j + 1;
    while (x >= 0 && y <= 7) {
      if (cells[x][y].currentPiece) {
        if (cells[x][y].currentPiece?.color !== fromColorType) {
          result.push(cells[x][y]);
        }
        break;
      } else {
        result.push(cells[x][y]);
      }
      x--;
      y++;
    }

    // going bottom-left
    x = i + 1;
    y = j - 1;
    while (x <= 7 && y >= 0) {
      if (cells[x][y].currentPiece) {
        if (cells[x][y].currentPiece?.color !== fromColorType) {
          result.push(cells[x][y]);
        }
        break;
      } else {
        result.push(cells[x][y]);
      }
      x++;
      y--;
    }

    // going top-left
    x = i - 1;
    y = j - 1;
    while (x >= 0 && y >= 0) {
      if (cells[x][y].currentPiece) {
        if (cells[x][y].currentPiece?.color !== fromColorType) {
          result.push(cells[x][y]);
        }
        break;
      } else {
        result.push(cells[x][y]);
      }
      x--;
      y--;
    }

    // going bottom-right
    x = i + 1;
    y = j + 1;
    while (x <= 7 && y <= 7) {
      if (cells[x][y].currentPiece) {
        if (cells[x][y].currentPiece?.color !== fromColorType) {
          result.push(cells[x][y]);
        }
        break;
      } else {
        result.push(cells[x][y]);
      }
      x++;
      y++;
    }

    return result;
  };

  public static GetLMovementCellsFromIndex = (
    cells: Cell[][],
    i: number,
    j: number
  ): Cell[] => {
    const result: Cell[] = [];
    // 8 possible moves a knight can make if valid

    // top-right
    if (this.IsCellValid(i - 2, j + 1)) {
      result.push(cells[i - 2][j + 1]);
    }
    if (this.IsCellValid(i - 1, j + 2)) {
      result.push(cells[i - 1][j + 2]);
    }

    // bottom-right
    if (this.IsCellValid(i + 1, j + 2)) {
      result.push(cells[i + 1][j + 2]);
    }
    if (this.IsCellValid(i + 2, j + 1)) {
      result.push(cells[i + 2][j + 1]);
    }

    // bottom-left
    if (this.IsCellValid(i + 1, j - 2)) {
      result.push(cells[i + 1][j - 2]);
    }
    if (this.IsCellValid(i + 2, j - 1)) {
      result.push(cells[i + 2][j - 1]);
    }

    // top-left
    if (this.IsCellValid(i - 1, j - 2)) {
      result.push(cells[i - 1][j - 2]);
    }
    if (this.IsCellValid(i - 2, j - 1)) {
      result.push(cells[i - 2][j - 1]);
    }

    return result;
  };
}
