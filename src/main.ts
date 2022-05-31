import { ImageReader } from "./ImageReader";
import { canvas, board } from "./setup";
import { CellHelper } from "./utils/CellHelper";

board.initCells();
board.draw();

const reader = new ImageReader();
reader.draw(canvas);

const a8 = board.cells[0][0];
a8.color = "violet";

const { i, j } = CellHelper.NameToIndex("g7");
const d3 = board.cells[i][j];
d3.color = "violet";

board.draw();
CellHelper.DrawCellNameToBoard("g7", board, canvas.ctx);
