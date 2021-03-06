import {
  WhiteBishop,
  WhiteKing,
  WhiteKnight,
  WhitePawn,
  WhiteQueen,
  WhiteRook,
} from "./pieces/white";
import {
  BlackQueen,
  BlackRook,
  BlackKnight,
  BlackBishop,
  BlackKing,
} from "./pieces/black";
import { Canvas } from "./Canvas";
import { Cell } from "./Cell";
import { BlackPawn } from "./pieces/black/BlackPawn";
import { CellHelper } from "./utils/CellHelper";
import { Globals } from "./utils/Globals";
import { Rnd } from "./utils/Rnd";
import { ColorType } from "./types";
import { BasePiece } from "./pieces/BasePiece";

export class Board {
  public canvas: Canvas;
  public cells: Cell[][] = [];
  public currentPlayer: ColorType = "white";
  public currentSelectedCell: Cell | null = null;
  public attempedNextSelectedCell: Cell | null = null;
  public nextSelectedCell: Cell | null = null;
  public moves: any = [];
  public capturedPieces: BasePiece[] = [];
  public lastMovedPieceCellPosition: Cell | null = null;
  public possibleMoves: Cell[] = [];

  public moveSound = new Audio("/sound/public_sound_standard_Move.mp3");
  public captureSound = new Audio("/sound/public_sound_standard_Capture.mp3");
  public captured_pieces_by_white = document.querySelector(
    "#captured_pieces_by_white"
  )!;
  public captured_pieces_by_black = document.querySelector(
    "#captured_pieces_by_black"
  )!;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.captureSound.preload = "auto";
    this.captureSound.load();

    this.moveSound.preload = "auto";
    this.moveSound.load();
  }

  public initCells = (): void => {
    for (let i = 0; i < 8; i++) {
      let arr: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        const x = this.startX + j * this.cellSize;
        const y = this.startY + i * this.cellSize;
        const color =
          (i + j) % 2 === 0
            ? Globals.WHITE_CELL_COLOR
            : Globals.BLACK_CELL_COLOR;
        const name = CellHelper.IndexToName(i, j);

        arr.push(new Cell(name, this.canvas, x, y, this.cellSize, color));
      }
      this.cells.push(arr);
    }
  };

  public setInitialPositions = () => {
    const { white, black } = CellHelper.GetInitialPositions();

    // White pieces
    white.pawns.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `pawn:${Rnd.GenerateId()}`;
      cell.currentPiece = new WhitePawn(
        this,
        pos,
        pos,
        name,
        this.canvas,
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
      "king",
      this.canvas,
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
      "queen",
      this.canvas,
      whiteQueenCell.x,
      whiteQueenCell.y,
      whiteQueenCell.size,
      "white"
    );

    white.rooks.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `rook:${Rnd.GenerateId()}`;
      cell.currentPiece = new WhiteRook(
        this,
        pos,
        pos,
        name,
        this.canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    white.bishops.forEach((pos, index) => {
      const cell = this.getCellAtPosition(pos);
      const name = `bishop:${
        index === 0 ? "black" : "white"
      }:${Rnd.GenerateId()}`;
      cell.currentPiece = new WhiteBishop(
        this,
        pos,
        pos,
        name,
        this.canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    white.knights.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `knight:${Rnd.GenerateId()}`;
      cell.currentPiece = new WhiteKnight(
        this,
        pos,
        pos,
        name,
        this.canvas,
        cell.x,
        cell.y,
        cell.size,
        "white"
      );
    });

    // black pieces -------------------- //
    black.pawns.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `pawn:${Rnd.GenerateId()}`;
      cell.currentPiece = new BlackPawn(
        this,
        pos,
        pos,
        name,
        this.canvas,
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
      "king",
      this.canvas,
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
      "queen",
      this.canvas,
      blackQueenCell.x,
      blackQueenCell.y,
      blackQueenCell.size,
      "black"
    );

    black.rooks.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `rook:${Rnd.GenerateId()}`;
      cell.currentPiece = new BlackRook(
        this,
        pos,
        pos,
        name,
        this.canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });

    black.bishops.forEach((pos, index) => {
      const cell = this.getCellAtPosition(pos);
      const name = `bishop:${
        index === 0 ? "white" : "black"
      }:${Rnd.GenerateId()}`;
      cell.currentPiece = new BlackBishop(
        this,
        pos,
        pos,
        name,
        this.canvas,
        cell.x,
        cell.y,
        cell.size,
        "black"
      );
    });

    black.knights.forEach((pos) => {
      const cell = this.getCellAtPosition(pos);
      const name = `knight:${Rnd.GenerateId()}`;
      cell.currentPiece = new BlackKnight(
        this,
        pos,
        pos,
        name,
        this.canvas,
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
        // drawing cells
        this.cells[i][j].drawRect();

        // drawing current position pieces
        const cell = this.getCellAtIndex(i, j);
        cell.currentPiece?.draw();

        // drawing currently selected cell
        this.currentSelectedCell?.drawStroke("#bcc5366b", 3);

        if (this.lastMovedPieceCellPosition) {
          this.lastMovedPieceCellPosition.drawStroke("darkgreen", 3);
        }

        if (this.currentSelectedCell && this.possibleMoves.length > 0) {
          this.possibleMoves.forEach((item) => {
            if (item.currentPiece !== null) {
              item.drawCircle(this.canvas.ctx, 6, "red");
            } else {
              item.drawCircle(this.canvas.ctx, 6, "#bcc5366b");
            }
          });
        }
      }
    }

    // render captured pieces
    this.drawCapturedPieces();
  };

  public drawCapturedPieces = () => {
    const capturedByWhite = [];
    const capturedByBlack = [];
    let capturedByWhiteString: string = "-";
    let capturedByBlackString: string = "-";

    for (let i = 0; i < this.capturedPieces.length; i++) {
      if (this.capturedPieces[i].color === "white") {
        capturedByBlack.push(this.capturedPieces[i]);
      } else {
        capturedByWhite.push(this.capturedPieces[i]);
      }
    }

    // sort captured arrays
    capturedByWhite.sort((i, j) => j.pointsValue - i.pointsValue);
    capturedByBlack.sort((i, j) => j.pointsValue - i.pointsValue);

    // total points
    const pointsByWhite = capturedByWhite.reduce((sum, curr) => {
      return sum + curr.pointsValue;
    }, 0);

    const pointsByBlack = capturedByBlack.reduce((sum, curr) => {
      return sum + curr.pointsValue;
    }, 0);

    if (capturedByWhite.length > 0) {
      const span = `<span class="text-sm"> [${pointsByWhite}]</span>`;
      capturedByWhiteString =
        capturedByWhite.map((item) => item.unicode).join(" ") + span;
      this.captured_pieces_by_white.innerHTML = capturedByWhiteString;
    }

    if (capturedByBlack.length > 0) {
      const span = `<span class="text-sm"> [${pointsByBlack}]</span>`;
      capturedByBlackString =
        capturedByBlack.map((item) => item.unicode).join(" ") + span;
      this.captured_pieces_by_black.innerHTML = capturedByBlackString;
    }
  };

  // length % 8 must be 0
  get length(): number {
    const l =
      Math.min(this.canvas.c.width, this.canvas.c.height) *
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

  public getCellByCoordinates = (x: number, y: number) => {
    // loop over cells and check for whatever
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const cell = this.getCellAtIndex(i, j);
        if (
          x > cell.x &&
          x < cell.x + this.cellSize &&
          y > cell.y &&
          y < cell.y + this.cellSize
        ) {
          return cell;
        }
      }
    }
  };

  public getCellAtPosition = (position: string) => {
    const { i, j } = CellHelper.NameToIndex(position);
    return this.getCellAtIndex(i, j);
  };

  public getCellAtIndex = (i: number, j: number) => {
    return this.cells[i][j];
  };

  public getPieceAtPosition = (position: string): BasePiece | null => {
    const cell = this.getCellAtPosition(position);
    if (!cell.currentPiece) return null;
    return cell.currentPiece;
  };

  public setPossibleMoves = (cells: Cell[]): void => {
    this.possibleMoves = cells;
  };

  public listenForMoves = () => {
    let playCaptureSound = false;

    if (this.currentSelectedCell && this.nextSelectedCell) {
      // capturing if exists
      if (this.nextSelectedCell.currentPiece) {
        playCaptureSound = true;
        this.capturedPieces.push(this.nextSelectedCell.currentPiece);
      }

      // setting next cell's new piece
      this.currentSelectedCell.currentPiece!.hasMoved = true;
      this.nextSelectedCell.currentPiece =
        this.currentSelectedCell.currentPiece;

      // setting next cell's piece's position
      this.nextSelectedCell.currentPiece!.currentPosition =
        this.nextSelectedCell.name;

      // setting lastMovedPieceCellPosition
      this.lastMovedPieceCellPosition = this.nextSelectedCell;

      // removing current cell's piece
      this.currentSelectedCell.currentPiece = null;

      // cleanup after move
      this.currentSelectedCell = null;
      this.attempedNextSelectedCell = null;
      this.nextSelectedCell = null;

      if (playCaptureSound) {
        this.captureSound.play();
      } else {
        this.moveSound.play();
      }
      this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    }
  };
}
