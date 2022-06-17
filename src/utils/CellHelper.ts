import { Board } from "../Board";
import { Cell } from "../Cell";

export class CellHelper {
  // public static IndexToName(i: number, j: number): string {
  //   // 0, 0 -> a8
  //   // 3, 2 -> b5
  //   const letters = "abcdefgh";
  //   const char = letters[i];
  //   const num = 8 - j;
  //   // const num = letters.
  //   return char + num;
  // }

  // public static NameToIndex(name: string): { i: number; j: number } {
  //   const letters = "abcdefgh";

  //   name = name.toLowerCase();
  //   if (name.length !== 2) throw new Error("Cell name must be length 2");

  //   const num = parseInt(name[1]);
  //   if (num > 8 || num < 1) throw new Error("Number must be between 1-8");

  //   const i = letters.indexOf(name[0]);

  //   const j = 8 - num;
  //   if (i === -1) throw new Error("valid letters {a,b,c,e,d,f,g,h}");

  //   return { i, j };
  // }

  public static IndexToName(i: number, j: number): string {
    // 0, 0 -> a8
    // 3, 2 -> b5
    const num = 8 - i;

    const letters = "abcdefgh";
    const char = letters[j];
    return char + num;
  }

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
      },

      black: {
        pawns: ["a7", "b7", "c7", "e7", "d7", "f7", "g7", "h7"],
      },
    };
  }
}
