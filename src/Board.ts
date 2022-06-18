import {
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
} from "./pieces/white";
import { Canvas } from "./Canvas";
import { Cell } from "./Cell";
import { BlackPawn } from "./pieces/black/BlackPawn";
import { CellHelper } from "./utils/CellHelper";
import { Globals } from "./utils/Globals";
import { Rnd } from "./utils/Rnd";
import {
  BlackQueen,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackKing,
} from "./pieces/black";

export class Board {
  private _canvas: Canvas;
  public cells: Cell[][] = [];

  constructor(canvas: Canvas) {
    this._canvas = canvas;
  }

  // length % 8 must be 0
  get length(): number {
    const l =
      Math.min(this._canvas.c.width, this._canvas.c.height) *
      Globals.BOARD_TO_WINDOW_RATIO;

    const remaining = l % 8;
    return l - remaining;
  }

  get startX(): number {
    return (window.innerWidth - this.length) / 2;
  }

  get startY(): number {
    return (window.innerHeight - this.length) / 2;
  }

  get cellSize(): number {
    return this.length / 8;
  }

  public getCellAtPosition = (position: string) => {
    const { i, j } = CellHelper.NameToIndex(position);
    return this.getCellAtIndex(i, j);
  };

  public getCellAtIndex = (i: number, j: number) => {
    return this.cells[i][j];
  };

  public initCells = (): void => {
    for (let i = 0; i < 8; i++) {
      let arr: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        const x = this.startX + j * this.cellSize;
        const y = this.startY + i * this.cellSize;
        const color = (i + j) % 2 === 0 ? "white" : "tomato";
        const name = CellHelper.IndexToName(i, j);

        arr.push(new Cell(name, this._canvas, x, y, this.cellSize, color));
      }
      this.cells.push(arr);
    }
  };

  public setInitialPositions = () => {
    const { white, black } = CellHelper.GetInitialPositions();

    // White pieces
    white.pawns.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new WhitePawn(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    const whiteKingCell = this.getCellAtPosition(white.king);
    whiteKingCell.currentPiece = new WhiteKing(
      this,
      white.king,
      white.king,
      Rnd.GenerateId(),
      this._canvas,
      whiteKingCell.x,
      whiteKingCell.y,
      whiteKingCell.size,
      "white"
    );

    const whiteQueenCell = this.getCellAtPosition(white.queen);
    whiteQueenCell.currentPiece = new WhiteQueen(
      this,
      white.queen,
      white.queen,
      Rnd.GenerateId(),
      this._canvas,
      whiteQueenCell.x,
      whiteQueenCell.y,
      whiteQueenCell.size,
      "white"
    );

    white.rooks.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new WhiteRook(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    white.bishops.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new WhiteBishop(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    white.knights.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new WhiteKnight(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    // black pieces -------------------- //
    black.pawns.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new BlackPawn(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });

    const blackKingCell = this.getCellAtPosition(black.king);
    blackKingCell.currentPiece = new BlackKing(
      this,
      black.king,
      black.king,
      Rnd.GenerateId(),
      this._canvas,
      blackKingCell.x,
      blackKingCell.y,
      blackKingCell.size,
      "black"
    );

    const blackQueenCell = this.getCellAtPosition(black.queen);
    blackQueenCell.currentPiece = new BlackQueen(
      this,
      black.queen,
      black.queen,
      Rnd.GenerateId(),
      this._canvas,
      blackQueenCell.x,
      blackQueenCell.y,
      blackQueenCell.size,
      "black"
    );

    black.rooks.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new BlackRook(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });

    black.bishops.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new BlackBishop(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });

    black.knights.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      cell.currentPiece = new BlackKnight(
        this,
        pos,
        pos,
        Rnd.GenerateId(),
        this._canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });
  };

  public init = () => {
    this.initCells();
    this.setInitialPositions();
  };

  public draw = (): void => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.cells[i][j].drawRect();

        const cell = this.getCellAtIndex(i, j);
        if (cell.currentPiece) {
          cell.currentPiece.draw();
          // console.log(cell.center);
        }
      }
    }
  };
}
