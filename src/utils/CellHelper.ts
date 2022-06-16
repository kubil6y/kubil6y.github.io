import { Board } from "../Board";
import { Cell } from "../Cell";

export class CellHelper {
  public static IndexToName(i: number, j: number): string {
    const letters = "abcdefgh";
    if (i < 0 || i > 7 || j < 0 || i > 7) {
      throw new Error("i and j must be between 0-7");
    }
    return `${letters[j]}${8 - i}`;
  }

  public static NameToIndex(name: string): { i: number; j: number } {
    const letters = "abcdefgh";

    name = name.toLowerCase();
    if (name.length !== 2) throw new Error("Cell name must be length 2");

    const num = parseInt(name[1]);
    if (num > 8 || num < 1) throw new Error("Number must be between 1-8");

    const i = 8 - num;
    const j = letters.indexOf(name[0]);
    if (j === -1) throw new Error("valid letters {a,b,c,e,d,f,g,h}");

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
}
