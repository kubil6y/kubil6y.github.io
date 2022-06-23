/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BaseComponent.ts":
/*!******************************!*\
  !*** ./src/BaseComponent.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseComponent = void 0;
class BaseComponent {
    constructor(name, canvas, x, y, size, color) {
        this.name = name;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.drawRect = (color) => {
            if (color) {
                this.canvas.ctx.fillStyle = color;
            }
            else {
                this.canvas.ctx.fillStyle = this.color;
            }
            this.canvas.ctx.fillRect(this.x, this.y, this.size, this.size);
        };
        this.drawStroke = (color, thickness) => {
            if (color) {
                this.canvas.ctx.strokeStyle = color;
            }
            else {
                this.canvas.ctx.strokeStyle = this.color;
            }
            if (thickness) {
                this.canvas.ctx.lineWidth = thickness;
            }
            this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
        };
        this.drawText = (text) => {
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = `${this.size}px arial`;
            this.canvas.ctx.fillText(text, this.x, this.y);
            this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
        };
    }
}
exports.BaseComponent = BaseComponent;


/***/ }),

/***/ "./src/Board.ts":
/*!**********************!*\
  !*** ./src/Board.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Board = void 0;
const white_1 = __webpack_require__(/*! ./pieces/white */ "./src/pieces/white/index.ts");
const black_1 = __webpack_require__(/*! ./pieces/black */ "./src/pieces/black/index.ts");
const Cell_1 = __webpack_require__(/*! ./Cell */ "./src/Cell.ts");
const BlackPawn_1 = __webpack_require__(/*! ./pieces/black/BlackPawn */ "./src/pieces/black/BlackPawn.ts");
const CellHelper_1 = __webpack_require__(/*! ./utils/CellHelper */ "./src/utils/CellHelper.ts");
const Globals_1 = __webpack_require__(/*! ./utils/Globals */ "./src/utils/Globals.ts");
const Rnd_1 = __webpack_require__(/*! ./utils/Rnd */ "./src/utils/Rnd.ts");
class Board {
    constructor(canvas) {
        this.cells = [];
        this.currentPlayer = "white";
        this.currentSelectedCell = null;
        this.attempedNextSelectedCell = null;
        this.nextSelectedCell = null;
        this.moves = [];
        this.capturedPieces = [];
        this.lastMovedPieceCellPosition = null;
        this.possibleMoves = [];
        this.moveSound = new Audio("/sound/public_sound_standard_Move.mp3");
        this.captureSound = new Audio("/sound/public_sound_standard_Capture.mp3");
        this.captured_pieces_by_white = document.querySelector("#captured_pieces_by_white");
        this.captured_pieces_by_black = document.querySelector("#captured_pieces_by_black");
        this.initCells = () => {
            for (let i = 0; i < 8; i++) {
                let arr = [];
                for (let j = 0; j < 8; j++) {
                    const x = this.startX + j * this.cellSize;
                    const y = this.startY + i * this.cellSize;
                    const color = (i + j) % 2 === 0
                        ? Globals_1.Globals.WHITE_CELL_COLOR
                        : Globals_1.Globals.BLACK_CELL_COLOR;
                    const name = CellHelper_1.CellHelper.IndexToName(i, j);
                    arr.push(new Cell_1.Cell(name, this.canvas, x, y, this.cellSize, color));
                }
                this.cells.push(arr);
            }
        };
        this.setInitialPositions = () => {
            const { white, black } = CellHelper_1.CellHelper.GetInitialPositions();
            // White pieces
            white.pawns.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `pawn:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new white_1.WhitePawn(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "white");
            });
            const whiteKingCell = this.getCellAtPosition(white.king);
            whiteKingCell.currentPiece = new white_1.WhiteKing(this, white.king, white.king, "king", this.canvas, whiteKingCell.x, whiteKingCell.y, whiteKingCell.size, "white");
            const whiteQueenCell = this.getCellAtPosition(white.queen);
            whiteQueenCell.currentPiece = new white_1.WhiteQueen(this, white.queen, white.queen, "queen", this.canvas, whiteQueenCell.x, whiteQueenCell.y, whiteQueenCell.size, "white");
            white.rooks.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `rook:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new white_1.WhiteRook(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "white");
            });
            white.bishops.forEach((pos, index) => {
                const cell = this.getCellAtPosition(pos);
                const name = `bishop:${index === 0 ? "black" : "white"}:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new white_1.WhiteBishop(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "white");
            });
            white.knights.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `knight:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new white_1.WhiteKnight(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "white");
            });
            // black pieces -------------------- //
            black.pawns.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `pawn:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new BlackPawn_1.BlackPawn(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "black");
            });
            const blackKingCell = this.getCellAtPosition(black.king);
            blackKingCell.currentPiece = new black_1.BlackKing(this, black.king, black.king, "king", this.canvas, blackKingCell.x, blackKingCell.y, blackKingCell.size, "black");
            const blackQueenCell = this.getCellAtPosition(black.queen);
            blackQueenCell.currentPiece = new black_1.BlackQueen(this, black.queen, black.queen, "queen", this.canvas, blackQueenCell.x, blackQueenCell.y, blackQueenCell.size, "black");
            black.rooks.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `rook:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new black_1.BlackRook(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "black");
            });
            black.bishops.forEach((pos, index) => {
                const cell = this.getCellAtPosition(pos);
                const name = `bishop:${index === 0 ? "white" : "black"}:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new black_1.BlackBishop(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "black");
            });
            black.knights.forEach((pos) => {
                const cell = this.getCellAtPosition(pos);
                const name = `knight:${Rnd_1.Rnd.GenerateId()}`;
                cell.currentPiece = new black_1.BlackKnight(this, pos, pos, name, this.canvas, cell.x, cell.y, cell.size, "black");
            });
        };
        this.init = () => {
            this.initCells();
            this.setInitialPositions();
        };
        this.draw = () => {
            var _a, _b;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    // drawing cells
                    this.cells[i][j].drawRect();
                    // drawing current position pieces
                    const cell = this.getCellAtIndex(i, j);
                    (_a = cell.currentPiece) === null || _a === void 0 ? void 0 : _a.draw();
                    // drawing currently selected cell
                    (_b = this.currentSelectedCell) === null || _b === void 0 ? void 0 : _b.drawStroke("#bcc5366b", 3);
                    if (this.lastMovedPieceCellPosition) {
                        this.lastMovedPieceCellPosition.drawStroke("darkgreen", 3);
                    }
                    if (this.currentSelectedCell && this.possibleMoves.length > 0) {
                        this.possibleMoves.forEach((item) => {
                            if (item.currentPiece !== null) {
                                item.drawCircle(this.canvas.ctx, 6, "red");
                            }
                            else {
                                item.drawCircle(this.canvas.ctx, 6, "#bcc5366b");
                            }
                        });
                    }
                }
            }
            // render captured pieces
            this.drawCapturedPieces();
        };
        this.drawCapturedPieces = () => {
            const capturedByWhite = [];
            const capturedByBlack = [];
            let capturedByWhiteString = "-";
            let capturedByBlackString = "-";
            for (let i = 0; i < this.capturedPieces.length; i++) {
                if (this.capturedPieces[i].color === "white") {
                    capturedByBlack.push(this.capturedPieces[i]);
                }
                else {
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
        this.getCellByCoordinates = (x, y) => {
            // loop over cells and check for whatever
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    const cell = this.getCellAtIndex(i, j);
                    if (x > cell.x &&
                        x < cell.x + this.cellSize &&
                        y > cell.y &&
                        y < cell.y + this.cellSize) {
                        return cell;
                    }
                }
            }
        };
        this.getCellAtPosition = (position) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(position);
            return this.getCellAtIndex(i, j);
        };
        this.getCellAtIndex = (i, j) => {
            return this.cells[i][j];
        };
        this.getPieceAtPosition = (position) => {
            const cell = this.getCellAtPosition(position);
            if (!cell.currentPiece)
                return null;
            return cell.currentPiece;
        };
        this.setPossibleMoves = (cells) => {
            this.possibleMoves = cells;
        };
        this.listenForMoves = () => {
            let playCaptureSound = false;
            if (this.currentSelectedCell && this.nextSelectedCell) {
                // capturing if exists
                if (this.nextSelectedCell.currentPiece) {
                    playCaptureSound = true;
                    this.capturedPieces.push(this.nextSelectedCell.currentPiece);
                }
                // setting next cell's new piece
                this.currentSelectedCell.currentPiece.hasMoved = true;
                this.nextSelectedCell.currentPiece =
                    this.currentSelectedCell.currentPiece;
                // setting next cell's piece's position
                this.nextSelectedCell.currentPiece.currentPosition =
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
                }
                else {
                    this.moveSound.play();
                }
                this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
            }
        };
        this.canvas = canvas;
        this.captureSound.preload = "auto";
        this.captureSound.load();
        this.moveSound.preload = "auto";
        this.moveSound.load();
    }
    // length % 8 must be 0
    get length() {
        const l = Math.min(this.canvas.c.width, this.canvas.c.height) *
            Globals_1.Globals.BOARD_TO_WINDOW_RATIO;
        const remaining = l % 8;
        return l - remaining;
    }
    get startX() {
        return (window.innerWidth - this.length) / 2;
    }
    get startY() {
        return (window.innerHeight - this.length) / 2;
    }
    get cellSize() {
        return this.length / 8;
    }
}
exports.Board = Board;


/***/ }),

/***/ "./src/Canvas.ts":
/*!***********************!*\
  !*** ./src/Canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Canvas = void 0;
class Canvas {
    constructor() {
        this.c = document.querySelector("canvas");
        this.ctx = this.c.getContext("2d");
        this.c.width = window.innerWidth;
        this.c.height = window.innerHeight;
        window.addEventListener("resize", () => {
            this.c.width = window.innerWidth;
            this.c.height = window.innerHeight;
        });
    }
}
exports.Canvas = Canvas;


/***/ }),

/***/ "./src/Cell.ts":
/*!*********************!*\
  !*** ./src/Cell.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cell = void 0;
const BaseComponent_1 = __webpack_require__(/*! ./BaseComponent */ "./src/BaseComponent.ts");
class Cell extends BaseComponent_1.BaseComponent {
    constructor(name, canvas, x, y, size, color) {
        super(name, canvas, x, y, size, color);
        this.name = name;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.currentPiece = null;
        this.drawCircle = (ctx, radius, color) => {
            ctx.beginPath();
            const { x, y } = this.center;
            ctx.fillStyle = color;
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        };
    }
    get center() {
        const x = this.x + this.size / 2;
        const y = this.y + this.size / 2;
        return { x, y };
    }
    setCurrentPiece(piece) {
        this.currentPiece = piece;
    }
}
exports.Cell = Cell;


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Game = void 0;
const Board_1 = __webpack_require__(/*! ./Board */ "./src/Board.ts");
const EventRunner_1 = __webpack_require__(/*! ./events/EventRunner */ "./src/events/EventRunner.ts");
const InformationService_1 = __webpack_require__(/*! ./InformationService */ "./src/InformationService.ts");
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.board = new Board_1.Board(this.canvas);
        this._eventRunner = new EventRunner_1.EventRunner(this.board);
        this._informationService = new InformationService_1.InformationService(this);
        this.init = () => {
            this.board.init();
        };
        this.draw = () => {
            this.board.draw();
            this._informationService.update();
            this.board.listenForMoves();
        };
        // TODO only for dev
        this.printPiecesOnBoard = () => {
            const result = [];
            for (let i = 0; i < 8; i++) {
                const arr = [];
                for (let j = 0; j < 8; j++) {
                    const item = {
                        position: this.board.cells[i][j].name,
                        piece: this.board.cells[i][j].currentPiece,
                    };
                    arr.push(item);
                }
                result.push(arr);
            }
            console.log(result);
        };
    }
}
exports.Game = Game;


/***/ }),

/***/ "./src/InformationService.ts":
/*!***********************************!*\
  !*** ./src/InformationService.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InformationService = void 0;
class InformationService {
    constructor(game) {
        this.game = game;
        this.root = document.querySelector(":root");
        this.update = () => {
            this.root.style.setProperty("--current-player", this.game.board.currentPlayer);
        };
    }
}
exports.InformationService = InformationService;


/***/ }),

/***/ "./src/events/ClickEvents.ts":
/*!***********************************!*\
  !*** ./src/events/ClickEvents.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClickEvents = void 0;
class ClickEvents {
    constructor(board) {
        this.handleSelectingCells = (cell) => {
            var _a, _b;
            if (cell.currentPiece &&
                this.board.currentPlayer === cell.currentPiece.color &&
                !this.board.attempedNextSelectedCell &&
                !this.board.nextSelectedCell) {
                // Selecting currentSelectedCell
                this.board.currentSelectedCell = cell;
                const possibleMoves = ((_a = this.board.currentSelectedCell.currentPiece) === null || _a === void 0 ? void 0 : _a.getValidMoves(this.board.cells)) || [];
                this.board.setPossibleMoves(possibleMoves);
            }
            else if (this.board.currentSelectedCell && !this.board.nextSelectedCell) {
                // Selecting attempedNextSelectedCell
                this.board.attempedNextSelectedCell = cell;
                if ((_b = this.board.currentSelectedCell.currentPiece) === null || _b === void 0 ? void 0 : _b.isValidMove(this.board.cells, cell)) {
                    // Selecting nextSelectedCell
                    this.board.nextSelectedCell = cell;
                    this.board.setPossibleMoves([]);
                }
            }
        };
        this.board = board;
        window.addEventListener("click", (event) => {
            const cell = this.board.getCellByCoordinates(event.x, event.y);
            if (cell) {
                this.handleSelectingCells(cell);
            }
        });
    }
}
exports.ClickEvents = ClickEvents;


/***/ }),

/***/ "./src/events/EventRunner.ts":
/*!***********************************!*\
  !*** ./src/events/EventRunner.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventRunner = void 0;
const ClickEvents_1 = __webpack_require__(/*! ./ClickEvents */ "./src/events/ClickEvents.ts");
const ResizeEvents_1 = __webpack_require__(/*! ./ResizeEvents */ "./src/events/ResizeEvents.ts");
class EventRunner {
    constructor(board) {
        this.board = board;
        this._resizeEvents = new ResizeEvents_1.ResizeEvents(this.board);
        this._clickEvents = new ClickEvents_1.ClickEvents(this.board);
    }
}
exports.EventRunner = EventRunner;


/***/ }),

/***/ "./src/events/ResizeEvents.ts":
/*!************************************!*\
  !*** ./src/events/ResizeEvents.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResizeEvents = void 0;
class ResizeEvents {
    constructor(board) {
        this.board = board;
        // FIXME resize cells and piece positions
        window.addEventListener("resize", () => {
            this.board.canvas.c.width = window.innerWidth;
            this.board.canvas.c.height = window.innerHeight;
        });
    }
}
exports.ResizeEvents = ResizeEvents;


/***/ }),

/***/ "./src/pieces/BasePiece.ts":
/*!*********************************!*\
  !*** ./src/pieces/BasePiece.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasePiece = void 0;
const BaseComponent_1 = __webpack_require__(/*! ../BaseComponent */ "./src/BaseComponent.ts");
const CellHelper_1 = __webpack_require__(/*! ../utils/CellHelper */ "./src/utils/CellHelper.ts");
class BasePiece extends BaseComponent_1.BaseComponent {
    constructor(board, initialPosition, currentPosition, name, canvas, x, y, size, color) {
        super(name, canvas, x, y, size, color);
        this.board = board;
        this.initialPosition = initialPosition;
        this.currentPosition = currentPosition;
        this.name = name;
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.img = document.querySelector("#pieces");
        this.hasMoved = false;
        // TODO pinned pieces should be included in isValidMove
        this.isPinned = false;
        this.drawUnicode = () => {
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = `${this.size}px arial`;
            this.canvas.ctx.fillText(this.unicode, this.x, this.y);
            this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
        };
    }
    draw() {
        const { x, y } = CellHelper_1.CellHelper.GetCellCenterByName(this.board.cells, this.currentPosition);
        const sWidth = this.img.naturalWidth / 6;
        const sHeight = this.img.naturalHeight / 2;
        const { imgW, imgH, imgOffsetX, imgOffsetY } = this.getImageCoordinates();
        const sx = sWidth * imgW;
        const sy = sHeight * imgH;
        const offsetX = sWidth / imgOffsetX;
        const offsetY = sHeight / imgOffsetY;
        const dx = x - offsetX;
        const dy = y - offsetY;
        const dWidth = 50;
        const dHeight = 50;
        this.canvas.ctx.drawImage(this.img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    }
}
exports.BasePiece = BasePiece;


/***/ }),

/***/ "./src/pieces/Bishop.ts":
/*!******************************!*\
  !*** ./src/pieces/Bishop.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bishop = void 0;
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class Bishop extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 3;
    }
}
exports.Bishop = Bishop;


/***/ }),

/***/ "./src/pieces/King.ts":
/*!****************************!*\
  !*** ./src/pieces/King.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.King = void 0;
const CellHelper_1 = __webpack_require__(/*! ../utils/CellHelper */ "./src/utils/CellHelper.ts");
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class King extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 999;
        this.getValidMoves = (cells) => {
            const result = [];
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
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
                var _a;
                if (CellHelper_1.CellHelper.IsCellValid(x, y)) {
                    if (cells[x][y].currentPiece === null) {
                        result.push(cells[x][y]);
                    }
                    else {
                        if (((_a = cells[x][y].currentPiece) === null || _a === void 0 ? void 0 : _a.color) !== this.color) {
                            result.push(cells[x][y]);
                        }
                    }
                }
            });
            return result;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
}
exports.King = King;


/***/ }),

/***/ "./src/pieces/Knight.ts":
/*!******************************!*\
  !*** ./src/pieces/Knight.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Knight = void 0;
const CellHelper_1 = __webpack_require__(/*! ../utils/CellHelper */ "./src/utils/CellHelper.ts");
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class Knight extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 3;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves = CellHelper_1.CellHelper.GetLMovementCellsFromIndex(cells, i, j);
            return moves.filter((cell) => { var _a; return ((_a = cell.currentPiece) === null || _a === void 0 ? void 0 : _a.color) !== this.color; });
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
}
exports.Knight = Knight;


/***/ }),

/***/ "./src/pieces/Pawn.ts":
/*!****************************!*\
  !*** ./src/pieces/Pawn.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pawn = void 0;
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class Pawn extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 1;
    }
}
exports.Pawn = Pawn;


/***/ }),

/***/ "./src/pieces/Queen.ts":
/*!*****************************!*\
  !*** ./src/pieces/Queen.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Queen = void 0;
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class Queen extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 9;
    }
}
exports.Queen = Queen;


/***/ }),

/***/ "./src/pieces/Rook.ts":
/*!****************************!*\
  !*** ./src/pieces/Rook.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rook = void 0;
const BasePiece_1 = __webpack_require__(/*! ./BasePiece */ "./src/pieces/BasePiece.ts");
class Rook extends BasePiece_1.BasePiece {
    constructor() {
        super(...arguments);
        this.pointsValue = 5;
    }
}
exports.Rook = Rook;


/***/ }),

/***/ "./src/pieces/black/BlackBishop.ts":
/*!*****************************************!*\
  !*** ./src/pieces/black/BlackBishop.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackBishop = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Bishop_1 = __webpack_require__(/*! ../Bishop */ "./src/pieces/Bishop.ts");
class BlackBishop extends Bishop_1.Bishop {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.Bishop;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves = CellHelper_1.CellHelper.Get45DegreeCellsIfEmptyFromIndex("black", cells, i, j);
            return moves;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 2,
            imgH: 1,
            imgOffsetX: 11.5,
            imgOffsetY: 12,
        };
    }
}
exports.BlackBishop = BlackBishop;


/***/ }),

/***/ "./src/pieces/black/BlackKing.ts":
/*!***************************************!*\
  !*** ./src/pieces/black/BlackKing.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackKing = void 0;
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const King_1 = __webpack_require__(/*! ../King */ "./src/pieces/King.ts");
class BlackKing extends King_1.King {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.King;
    }
    // public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    //   return true;
    // }
    // public getValidMoves = (cells: Cell[][]): Cell[] => {
    //   return [];
    // };
    getImageCoordinates() {
        return {
            imgW: 0,
            imgH: 1,
            imgOffsetX: 15,
            imgOffsetY: 11,
        };
    }
}
exports.BlackKing = BlackKing;


/***/ }),

/***/ "./src/pieces/black/BlackKnight.ts":
/*!*****************************************!*\
  !*** ./src/pieces/black/BlackKnight.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackKnight = void 0;
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Knight_1 = __webpack_require__(/*! ../Knight */ "./src/pieces/Knight.ts");
class BlackKnight extends Knight_1.Knight {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.Knight;
    }
    getImageCoordinates() {
        return {
            imgW: 3,
            imgH: 1,
            imgOffsetX: 10.5,
            imgOffsetY: 12,
        };
    }
}
exports.BlackKnight = BlackKnight;


/***/ }),

/***/ "./src/pieces/black/BlackPawn.ts":
/*!***************************************!*\
  !*** ./src/pieces/black/BlackPawn.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackPawn = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Pawn_1 = __webpack_require__(/*! ../Pawn */ "./src/pieces/Pawn.ts");
class BlackPawn extends Pawn_1.Pawn {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.Pawn;
        this.getValidMoves = (cells) => {
            var _a, _b;
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const result = [];
            if (!this.hasMoved) {
                if (cells[i + 2][j].currentPiece === null) {
                    result.push(cells[i + 2][j]);
                }
            }
            if (CellHelper_1.CellHelper.IsCellValid(i + 1, j) &&
                cells[i + 1][j].currentPiece === null) {
                result.push(cells[i + 1][j]);
            }
            if (CellHelper_1.CellHelper.IsCellValid(i + 1, j - 1) &&
                cells[i + 1][j - 1].currentPiece !== null &&
                ((_a = cells[i + 1][j - 1].currentPiece) === null || _a === void 0 ? void 0 : _a.color) !== this.color) {
                result.push(cells[i + 1][j - 1]);
            }
            if (CellHelper_1.CellHelper.IsCellValid(i + 1, j + 1) &&
                cells[i + 1][j + 1].currentPiece !== null &&
                ((_b = cells[i + 1][j + 1].currentPiece) === null || _b === void 0 ? void 0 : _b.color) !== this.color) {
                result.push(cells[i + 1][j + 1]);
            }
            return result;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 5,
            imgH: 1,
            imgOffsetX: 9,
            imgOffsetY: 11,
        };
    }
}
exports.BlackPawn = BlackPawn;


/***/ }),

/***/ "./src/pieces/black/BlackQueen.ts":
/*!****************************************!*\
  !*** ./src/pieces/black/BlackQueen.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackQueen = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Queen_1 = __webpack_require__(/*! ../Queen */ "./src/pieces/Queen.ts");
class BlackQueen extends Queen_1.Queen {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.Queen;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves45 = CellHelper_1.CellHelper.Get45DegreeCellsIfEmptyFromIndex("black", cells, i, j);
            const result = [...moves45];
            const moves90 = CellHelper_1.CellHelper.Get90DegreeCellsIfEmptyFromIndex("black", cells, i, j);
            moves90.forEach((cell) => {
                if (!result.includes(cell)) {
                    result.push(cell);
                }
            });
            return result;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 1,
            imgH: 1,
            imgOffsetX: 14,
            imgOffsetY: 12,
        };
    }
}
exports.BlackQueen = BlackQueen;


/***/ }),

/***/ "./src/pieces/black/BlackRook.ts":
/*!***************************************!*\
  !*** ./src/pieces/black/BlackRook.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BlackRook = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Rook_1 = __webpack_require__(/*! ../Rook */ "./src/pieces/Rook.ts");
class BlackRook extends Rook_1.Rook {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.Black.Rook;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves = CellHelper_1.CellHelper.Get90DegreeCellsIfEmptyFromIndex("black", cells, i, j);
            return moves;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 4,
            imgH: 1,
            imgOffsetX: 9.5,
            imgOffsetY: 12,
        };
    }
}
exports.BlackRook = BlackRook;


/***/ }),

/***/ "./src/pieces/black/index.ts":
/*!***********************************!*\
  !*** ./src/pieces/black/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./BlackBishop */ "./src/pieces/black/BlackBishop.ts"), exports);
__exportStar(__webpack_require__(/*! ./BlackKing */ "./src/pieces/black/BlackKing.ts"), exports);
__exportStar(__webpack_require__(/*! ./BlackKnight */ "./src/pieces/black/BlackKnight.ts"), exports);
__exportStar(__webpack_require__(/*! ./BlackPawn */ "./src/pieces/black/BlackPawn.ts"), exports);
__exportStar(__webpack_require__(/*! ./BlackQueen */ "./src/pieces/black/BlackQueen.ts"), exports);
__exportStar(__webpack_require__(/*! ./BlackRook */ "./src/pieces/black/BlackRook.ts"), exports);


/***/ }),

/***/ "./src/pieces/white/WhiteBishop.ts":
/*!*****************************************!*\
  !*** ./src/pieces/white/WhiteBishop.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhiteBishop = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Bishop_1 = __webpack_require__(/*! ../Bishop */ "./src/pieces/Bishop.ts");
class WhiteBishop extends Bishop_1.Bishop {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.Bishop;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves = CellHelper_1.CellHelper.Get45DegreeCellsIfEmptyFromIndex("white", cells, i, j);
            return moves;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 2,
            imgH: 0,
            imgOffsetX: 11.5,
            imgOffsetY: 14,
        };
    }
}
exports.WhiteBishop = WhiteBishop;


/***/ }),

/***/ "./src/pieces/white/WhiteKing.ts":
/*!***************************************!*\
  !*** ./src/pieces/white/WhiteKing.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhiteKing = void 0;
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const King_1 = __webpack_require__(/*! ../King */ "./src/pieces/King.ts");
class WhiteKing extends King_1.King {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.King;
    }
    // public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    //   return true;
    // }
    // public getValidMoves = (cells: Cell[][]): Cell[] => {
    //   return [];
    // };
    getImageCoordinates() {
        return {
            imgW: 0,
            imgH: 0,
            imgOffsetX: 15,
            imgOffsetY: 13,
        };
    }
}
exports.WhiteKing = WhiteKing;


/***/ }),

/***/ "./src/pieces/white/WhiteKnight.ts":
/*!*****************************************!*\
  !*** ./src/pieces/white/WhiteKnight.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhiteKnight = void 0;
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Knight_1 = __webpack_require__(/*! ../Knight */ "./src/pieces/Knight.ts");
class WhiteKnight extends Knight_1.Knight {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.Knight;
    }
    getImageCoordinates() {
        return {
            imgW: 3,
            imgH: 0,
            imgOffsetX: 10.5,
            imgOffsetY: 13,
        };
    }
}
exports.WhiteKnight = WhiteKnight;


/***/ }),

/***/ "./src/pieces/white/WhitePawn.ts":
/*!***************************************!*\
  !*** ./src/pieces/white/WhitePawn.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhitePawn = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Pawn_1 = __webpack_require__(/*! ../Pawn */ "./src/pieces/Pawn.ts");
class WhitePawn extends Pawn_1.Pawn {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.Pawn;
        this.isValidMove = (cells, nextCell) => {
            if (this.isPinned)
                return false;
            const validMoves = this.getValidMoves(cells);
            return validMoves.includes(nextCell);
        };
        this.getValidMoves = (cells) => {
            var _a, _b;
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const result = [];
            if (!this.hasMoved) {
                if (cells[i - 2][j].currentPiece === null) {
                    result.push(cells[i - 2][j]);
                }
            }
            if (CellHelper_1.CellHelper.IsCellValid(i - 1, j) &&
                cells[i - 1][j].currentPiece === null) {
                result.push(cells[i - 1][j]);
            }
            if (CellHelper_1.CellHelper.IsCellValid(i - 1, j - 1) &&
                cells[i - 1][j - 1].currentPiece !== null &&
                ((_a = cells[i - 1][j - 1].currentPiece) === null || _a === void 0 ? void 0 : _a.color) !== this.color) {
                result.push(cells[i - 1][j - 1]);
            }
            if (CellHelper_1.CellHelper.IsCellValid(i - 1, j + 1) &&
                cells[i - 1][j + 1].currentPiece !== null &&
                ((_b = cells[i - 1][j + 1].currentPiece) === null || _b === void 0 ? void 0 : _b.color) !== this.color) {
                result.push(cells[i - 1][j + 1]);
            }
            return result;
        };
    }
    getImageCoordinates() {
        return {
            imgW: 5,
            imgH: 0,
            imgOffsetX: 9,
            imgOffsetY: 13,
        };
    }
}
exports.WhitePawn = WhitePawn;


/***/ }),

/***/ "./src/pieces/white/WhiteQueen.ts":
/*!****************************************!*\
  !*** ./src/pieces/white/WhiteQueen.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhiteQueen = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Queen_1 = __webpack_require__(/*! ../Queen */ "./src/pieces/Queen.ts");
class WhiteQueen extends Queen_1.Queen {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.Queen;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves45 = CellHelper_1.CellHelper.Get45DegreeCellsIfEmptyFromIndex("white", cells, i, j);
            const result = [...moves45];
            const moves90 = CellHelper_1.CellHelper.Get90DegreeCellsIfEmptyFromIndex("white", cells, i, j);
            moves90.forEach((cell) => {
                if (!result.includes(cell)) {
                    result.push(cell);
                }
            });
            return result;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 1,
            imgH: 0,
            imgOffsetX: 14,
            imgOffsetY: 14.5,
        };
    }
}
exports.WhiteQueen = WhiteQueen;


/***/ }),

/***/ "./src/pieces/white/WhiteRook.ts":
/*!***************************************!*\
  !*** ./src/pieces/white/WhiteRook.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WhiteRook = void 0;
const CellHelper_1 = __webpack_require__(/*! ../../utils/CellHelper */ "./src/utils/CellHelper.ts");
const UnicodeCharacters_1 = __webpack_require__(/*! ../../utils/UnicodeCharacters */ "./src/utils/UnicodeCharacters.ts");
const Rook_1 = __webpack_require__(/*! ../Rook */ "./src/pieces/Rook.ts");
class WhiteRook extends Rook_1.Rook {
    constructor() {
        super(...arguments);
        this.unicode = UnicodeCharacters_1.UnicodeCharacters.White.Rook;
        this.getValidMoves = (cells) => {
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            const moves = CellHelper_1.CellHelper.Get90DegreeCellsIfEmptyFromIndex("white", cells, i, j);
            return moves;
        };
    }
    isValidMove(cells, nextCell) {
        if (this.isPinned)
            return false;
        const validMoves = this.getValidMoves(cells);
        return validMoves.includes(nextCell);
    }
    getImageCoordinates() {
        return {
            imgW: 4,
            imgH: 0,
            imgOffsetX: 9.5,
            imgOffsetY: 13,
        };
    }
}
exports.WhiteRook = WhiteRook;


/***/ }),

/***/ "./src/pieces/white/index.ts":
/*!***********************************!*\
  !*** ./src/pieces/white/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./WhiteBishop */ "./src/pieces/white/WhiteBishop.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteKing */ "./src/pieces/white/WhiteKing.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteKnight */ "./src/pieces/white/WhiteKnight.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhitePawn */ "./src/pieces/white/WhitePawn.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteQueen */ "./src/pieces/white/WhiteQueen.ts"), exports);
__exportStar(__webpack_require__(/*! ./WhiteRook */ "./src/pieces/white/WhiteRook.ts"), exports);


/***/ }),

/***/ "./src/setup.ts":
/*!**********************!*\
  !*** ./src/setup.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.game = exports.canvas = void 0;
const Canvas_1 = __webpack_require__(/*! ./Canvas */ "./src/Canvas.ts");
const Game_1 = __webpack_require__(/*! ./Game */ "./src/Game.ts");
exports.canvas = new Canvas_1.Canvas();
exports.game = new Game_1.Game(exports.canvas);


/***/ }),

/***/ "./src/utils/CellHelper.ts":
/*!*********************************!*\
  !*** ./src/utils/CellHelper.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CellHelper = void 0;
class CellHelper {
    static IndexToName(i, j) {
        // 0, 0 -> a8
        // 3, 2 -> b5
        const num = 8 - i;
        const letters = "abcdefgh";
        const char = letters[j];
        return char + num;
    }
    static NameToIndex(name) {
        const letters = "abcdefgh";
        name = name.toLowerCase();
        if (name.length !== 2)
            throw new Error("Cell name must be length 2");
        const num = parseInt(name[1]);
        if (num > 8 || num < 1)
            throw new Error("Number must be between 1-8");
        const j = letters.indexOf(name[0]);
        const i = 8 - num;
        if (i === -1)
            throw new Error("valid letters {a,b,c,e,d,f,g,h}");
        return { i, j };
    }
    static GetCellCenterByName(cells, name) {
        name = name.toLowerCase();
        const { i, j } = this.NameToIndex(name);
        return this.GetCellCenterByIndexes(cells, i, j);
    }
    static GetCellCenterByIndexes(cells, i, j) {
        const cell = cells[i][j];
        return cell.center;
    }
    static DrawCellNameToBoard(name, board, ctx) {
        name = name.toLowerCase();
        const fontSize = board.cellSize * 0.5;
        ctx.fillStyle = "black";
        ctx.font = `${fontSize}px arial`;
        const { x, y } = this.GetCellCenterByName(board.cells, name);
        ctx.fillText(name, x - fontSize / 2, y + fontSize / 4);
    }
    static GetInitialPositions() {
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
}
exports.CellHelper = CellHelper;
_a = CellHelper;
CellHelper.IsCellValid = (i, j) => {
    return i >= 0 && i <= 7 && j >= 0 && j <= 7;
};
CellHelper.Get90DegreeCellsIfEmptyFromIndex = (fromColorType, cells, i, j) => {
    var _b, _c, _d, _e;
    const result = [];
    // going right
    let x = i + 1;
    while (x <= 7) {
        if (cells[x][j].currentPiece) {
            if (((_b = cells[x][j].currentPiece) === null || _b === void 0 ? void 0 : _b.color) !== fromColorType) {
                result.push(cells[x][j]);
            }
            break;
        }
        else {
            result.push(cells[x][j]);
        }
        x++;
    }
    // going left
    x = i - 1;
    while (x >= 0) {
        if (cells[x][j].currentPiece) {
            if (((_c = cells[x][j].currentPiece) === null || _c === void 0 ? void 0 : _c.color) !== fromColorType) {
                result.push(cells[x][j]);
            }
            break;
        }
        else {
            result.push(cells[x][j]);
        }
        x--;
    }
    // going top
    let y = j - 1;
    while (y >= 0) {
        if (cells[i][y].currentPiece) {
            if (((_d = cells[i][y].currentPiece) === null || _d === void 0 ? void 0 : _d.color) !== fromColorType) {
                result.push(cells[i][y]);
            }
            break;
        }
        else {
            result.push(cells[i][y]);
        }
        y--;
    }
    y = j + 1;
    while (y <= 7) {
        if (cells[i][y].currentPiece) {
            if (((_e = cells[i][y].currentPiece) === null || _e === void 0 ? void 0 : _e.color) !== fromColorType) {
                result.push(cells[i][y]);
            }
            break;
        }
        else {
            result.push(cells[i][y]);
        }
        y++;
    }
    return result;
};
CellHelper.Get45DegreeCellsIfEmptyFromIndex = (fromColorType, cells, i, j) => {
    var _b, _c, _d, _e;
    const result = [];
    // going top-right
    let x = i - 1;
    let y = j + 1;
    while (x >= 0 && y <= 7) {
        if (cells[x][y].currentPiece) {
            if (((_b = cells[x][y].currentPiece) === null || _b === void 0 ? void 0 : _b.color) !== fromColorType) {
                result.push(cells[x][y]);
            }
            break;
        }
        else {
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
            if (((_c = cells[x][y].currentPiece) === null || _c === void 0 ? void 0 : _c.color) !== fromColorType) {
                result.push(cells[x][y]);
            }
            break;
        }
        else {
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
            if (((_d = cells[x][y].currentPiece) === null || _d === void 0 ? void 0 : _d.color) !== fromColorType) {
                result.push(cells[x][y]);
            }
            break;
        }
        else {
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
            if (((_e = cells[x][y].currentPiece) === null || _e === void 0 ? void 0 : _e.color) !== fromColorType) {
                result.push(cells[x][y]);
            }
            break;
        }
        else {
            result.push(cells[x][y]);
        }
        x++;
        y++;
    }
    return result;
};
CellHelper.GetLMovementCellsFromIndex = (cells, i, j) => {
    const result = [];
    // 8 possible moves a knight can make if valid
    // top-right
    if (_a.IsCellValid(i - 2, j + 1)) {
        result.push(cells[i - 2][j + 1]);
    }
    if (_a.IsCellValid(i - 1, j + 2)) {
        result.push(cells[i - 1][j + 2]);
    }
    // bottom-right
    if (_a.IsCellValid(i + 1, j + 2)) {
        result.push(cells[i + 1][j + 2]);
    }
    if (_a.IsCellValid(i + 2, j + 1)) {
        result.push(cells[i + 2][j + 1]);
    }
    // bottom-left
    if (_a.IsCellValid(i + 1, j - 2)) {
        result.push(cells[i + 1][j - 2]);
    }
    if (_a.IsCellValid(i + 2, j - 1)) {
        result.push(cells[i + 2][j - 1]);
    }
    // top-left
    if (_a.IsCellValid(i - 1, j - 2)) {
        result.push(cells[i - 1][j - 2]);
    }
    if (_a.IsCellValid(i - 2, j - 1)) {
        result.push(cells[i - 2][j - 1]);
    }
    return result;
};


/***/ }),

/***/ "./src/utils/Globals.ts":
/*!******************************!*\
  !*** ./src/utils/Globals.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Globals = void 0;
class Globals {
}
exports.Globals = Globals;
Globals.BOARD_TO_WINDOW_RATIO = 0.8;
Globals.BLACK_CELL_COLOR = "#ba8866";
Globals.WHITE_CELL_COLOR = "#f5d9b9";
Globals.LAST_MOVED_COLOR = "#cfd083";


/***/ }),

/***/ "./src/utils/Rnd.ts":
/*!**************************!*\
  !*** ./src/utils/Rnd.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rnd = void 0;
class Rnd {
    static GenerateId() {
        return (Math.random().toString(36) + "00000000000000000").slice(2, 5 + 2);
    }
}
exports.Rnd = Rnd;


/***/ }),

/***/ "./src/utils/UnicodeCharacters.ts":
/*!****************************************!*\
  !*** ./src/utils/UnicodeCharacters.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnicodeCharacters = void 0;
exports.UnicodeCharacters = {
    White: {
        King: "♔",
        Queen: "♕",
        Rook: "♖",
        Bishop: "♗",
        Knight: "♘",
        Pawn: "♙",
    },
    Black: {
        King: "♚",
        Queen: "♛",
        Rook: "♜",
        Bishop: "♝",
        Knight: "♞",
        Pawn: "♟",
    },
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const setup_1 = __webpack_require__(/*! ./setup */ "./src/setup.ts");
setup_1.game.init();
setup_1.game.draw();
function main() {
    setup_1.game.canvas.ctx.clearRect(0, 0, setup_1.game.canvas.c.width, setup_1.game.canvas.c.height);
    setup_1.game.draw();
    requestAnimationFrame(main);
}
main();
// export const devButton = document.querySelector("#dev-button")!;
// devButton.addEventListener("click", () => {
//   game.printPiecesOnBoard();
//   const target = CellHelper.IndexToName(4, 4);
//   console.log({
//     target,
//     possibleMoves: game.board.possibleMoves,
//     board: game.board,
//   });
// });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdk9hO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7Ozs7Ozs7Ozs7QUNSRTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL0Jhc2VDb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvQm9hcmQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvQ2FudmFzLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL0NlbGwudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvR2FtZS50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9JbmZvcm1hdGlvblNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvZXZlbnRzL0NsaWNrRXZlbnRzLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL2V2ZW50cy9FdmVudFJ1bm5lci50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9ldmVudHMvUmVzaXplRXZlbnRzLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9CYXNlUGllY2UudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL0Jpc2hvcC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvS25pZ2h0LnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9QYXduLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9RdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvUm9vay50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tCaXNob3AudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL2JsYWNrL0JsYWNrS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tLbmlnaHQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL2JsYWNrL0JsYWNrUGF3bi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tRdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tSb29rLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9ibGFjay9pbmRleC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVCaXNob3AudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL3doaXRlL1doaXRlS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVLbmlnaHQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL3doaXRlL1doaXRlUGF3bi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVRdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVSb29rLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy93aGl0ZS9pbmRleC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9zZXR1cC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy91dGlscy9DZWxsSGVscGVyLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3V0aWxzL0dsb2JhbHMudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvdXRpbHMvUm5kLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhc2VDb21wb25lbnQgPSB2b2lkIDA7XG5jbGFzcyBCYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXMsIHgsIHksIHNpemUsIGNvbG9yKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuZHJhd1JlY3QgPSAoY29sb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhd1N0cm9rZSA9IChjb2xvciwgdGhpY2tuZXNzKSA9PiB7XG4gICAgICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpY2tuZXNzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmxpbmVXaWR0aCA9IHRoaWNrbmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhd1RleHQgPSAodGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZm9udCA9IGAke3RoaXMuc2l6ZX1weCBhcmlhbGA7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZmlsbFRleHQodGV4dCwgdGhpcy54LCB0aGlzLnkpO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VDb21wb25lbnQgPSBCYXNlQ29tcG9uZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJvYXJkID0gdm9pZCAwO1xuY29uc3Qgd2hpdGVfMSA9IHJlcXVpcmUoXCIuL3BpZWNlcy93aGl0ZVwiKTtcbmNvbnN0IGJsYWNrXzEgPSByZXF1aXJlKFwiLi9waWVjZXMvYmxhY2tcIik7XG5jb25zdCBDZWxsXzEgPSByZXF1aXJlKFwiLi9DZWxsXCIpO1xuY29uc3QgQmxhY2tQYXduXzEgPSByZXF1aXJlKFwiLi9waWVjZXMvYmxhY2svQmxhY2tQYXduXCIpO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IEdsb2JhbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL0dsb2JhbHNcIik7XG5jb25zdCBSbmRfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL1JuZFwiKTtcbmNsYXNzIEJvYXJkIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBcIndoaXRlXCI7XG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkQ2VsbCA9IG51bGw7XG4gICAgICAgIHRoaXMuYXR0ZW1wZWROZXh0U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5uZXh0U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5tb3ZlcyA9IFtdO1xuICAgICAgICB0aGlzLmNhcHR1cmVkUGllY2VzID0gW107XG4gICAgICAgIHRoaXMubGFzdE1vdmVkUGllY2VDZWxsUG9zaXRpb24gPSBudWxsO1xuICAgICAgICB0aGlzLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5tb3ZlU291bmQgPSBuZXcgQXVkaW8oXCIvc291bmQvcHVibGljX3NvdW5kX3N0YW5kYXJkX01vdmUubXAzXCIpO1xuICAgICAgICB0aGlzLmNhcHR1cmVTb3VuZCA9IG5ldyBBdWRpbyhcIi9zb3VuZC9wdWJsaWNfc291bmRfc3RhbmRhcmRfQ2FwdHVyZS5tcDNcIik7XG4gICAgICAgIHRoaXMuY2FwdHVyZWRfcGllY2VzX2J5X3doaXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXB0dXJlZF9waWVjZXNfYnlfd2hpdGVcIik7XG4gICAgICAgIHRoaXMuY2FwdHVyZWRfcGllY2VzX2J5X2JsYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXB0dXJlZF9waWVjZXNfYnlfYmxhY2tcIik7XG4gICAgICAgIHRoaXMuaW5pdENlbGxzID0gKCkgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMuc3RhcnRYICsgaiAqIHRoaXMuY2VsbFNpemU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnN0YXJ0WSArIGkgKiB0aGlzLmNlbGxTaXplO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvciA9IChpICsgaikgJSAyID09PSAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IEdsb2JhbHNfMS5HbG9iYWxzLldISVRFX0NFTExfQ09MT1JcbiAgICAgICAgICAgICAgICAgICAgICAgIDogR2xvYmFsc18xLkdsb2JhbHMuQkxBQ0tfQ0VMTF9DT0xPUjtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkluZGV4VG9OYW1lKGksIGopO1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChuZXcgQ2VsbF8xLkNlbGwobmFtZSwgdGhpcy5jYW52YXMsIHgsIHksIHRoaXMuY2VsbFNpemUsIGNvbG9yKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2VsbHMucHVzaChhcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldEluaXRpYWxQb3NpdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IHdoaXRlLCBibGFjayB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0SW5pdGlhbFBvc2l0aW9ucygpO1xuICAgICAgICAgICAgLy8gV2hpdGUgcGllY2VzXG4gICAgICAgICAgICB3aGl0ZS5wYXducy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgcGF3bjoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyB3aGl0ZV8xLldoaXRlUGF3bih0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHdoaXRlS2luZ0NlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHdoaXRlLmtpbmcpO1xuICAgICAgICAgICAgd2hpdGVLaW5nQ2VsbC5jdXJyZW50UGllY2UgPSBuZXcgd2hpdGVfMS5XaGl0ZUtpbmcodGhpcywgd2hpdGUua2luZywgd2hpdGUua2luZywgXCJraW5nXCIsIHRoaXMuY2FudmFzLCB3aGl0ZUtpbmdDZWxsLngsIHdoaXRlS2luZ0NlbGwueSwgd2hpdGVLaW5nQ2VsbC5zaXplLCBcIndoaXRlXCIpO1xuICAgICAgICAgICAgY29uc3Qgd2hpdGVRdWVlbkNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHdoaXRlLnF1ZWVuKTtcbiAgICAgICAgICAgIHdoaXRlUXVlZW5DZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyB3aGl0ZV8xLldoaXRlUXVlZW4odGhpcywgd2hpdGUucXVlZW4sIHdoaXRlLnF1ZWVuLCBcInF1ZWVuXCIsIHRoaXMuY2FudmFzLCB3aGl0ZVF1ZWVuQ2VsbC54LCB3aGl0ZVF1ZWVuQ2VsbC55LCB3aGl0ZVF1ZWVuQ2VsbC5zaXplLCBcIndoaXRlXCIpO1xuICAgICAgICAgICAgd2hpdGUucm9va3MuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYHJvb2s6JHtSbmRfMS5SbmQuR2VuZXJhdGVJZCgpfWA7XG4gICAgICAgICAgICAgICAgY2VsbC5jdXJyZW50UGllY2UgPSBuZXcgd2hpdGVfMS5XaGl0ZVJvb2sodGhpcywgcG9zLCBwb3MsIG5hbWUsIHRoaXMuY2FudmFzLCBjZWxsLngsIGNlbGwueSwgY2VsbC5zaXplLCBcIndoaXRlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aGl0ZS5iaXNob3BzLmZvckVhY2goKHBvcywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgYmlzaG9wOiR7aW5kZXggPT09IDAgPyBcImJsYWNrXCIgOiBcIndoaXRlXCJ9OiR7Um5kXzEuUm5kLkdlbmVyYXRlSWQoKX1gO1xuICAgICAgICAgICAgICAgIGNlbGwuY3VycmVudFBpZWNlID0gbmV3IHdoaXRlXzEuV2hpdGVCaXNob3AodGhpcywgcG9zLCBwb3MsIG5hbWUsIHRoaXMuY2FudmFzLCBjZWxsLngsIGNlbGwueSwgY2VsbC5zaXplLCBcIndoaXRlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aGl0ZS5rbmlnaHRzLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGBrbmlnaHQ6JHtSbmRfMS5SbmQuR2VuZXJhdGVJZCgpfWA7XG4gICAgICAgICAgICAgICAgY2VsbC5jdXJyZW50UGllY2UgPSBuZXcgd2hpdGVfMS5XaGl0ZUtuaWdodCh0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGJsYWNrIHBpZWNlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuICAgICAgICAgICAgYmxhY2sucGF3bnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYHBhd246JHtSbmRfMS5SbmQuR2VuZXJhdGVJZCgpfWA7XG4gICAgICAgICAgICAgICAgY2VsbC5jdXJyZW50UGllY2UgPSBuZXcgQmxhY2tQYXduXzEuQmxhY2tQYXduKHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgYmxhY2tLaW5nQ2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24oYmxhY2sua2luZyk7XG4gICAgICAgICAgICBibGFja0tpbmdDZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyBibGFja18xLkJsYWNrS2luZyh0aGlzLCBibGFjay5raW5nLCBibGFjay5raW5nLCBcImtpbmdcIiwgdGhpcy5jYW52YXMsIGJsYWNrS2luZ0NlbGwueCwgYmxhY2tLaW5nQ2VsbC55LCBibGFja0tpbmdDZWxsLnNpemUsIFwiYmxhY2tcIik7XG4gICAgICAgICAgICBjb25zdCBibGFja1F1ZWVuQ2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24oYmxhY2sucXVlZW4pO1xuICAgICAgICAgICAgYmxhY2tRdWVlbkNlbGwuY3VycmVudFBpZWNlID0gbmV3IGJsYWNrXzEuQmxhY2tRdWVlbih0aGlzLCBibGFjay5xdWVlbiwgYmxhY2sucXVlZW4sIFwicXVlZW5cIiwgdGhpcy5jYW52YXMsIGJsYWNrUXVlZW5DZWxsLngsIGJsYWNrUXVlZW5DZWxsLnksIGJsYWNrUXVlZW5DZWxsLnNpemUsIFwiYmxhY2tcIik7XG4gICAgICAgICAgICBibGFjay5yb29rcy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgcm9vazoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyBibGFja18xLkJsYWNrUm9vayh0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwiYmxhY2tcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJsYWNrLmJpc2hvcHMuZm9yRWFjaCgocG9zLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGBiaXNob3A6JHtpbmRleCA9PT0gMCA/IFwid2hpdGVcIiA6IFwiYmxhY2tcIn06JHtSbmRfMS5SbmQuR2VuZXJhdGVJZCgpfWA7XG4gICAgICAgICAgICAgICAgY2VsbC5jdXJyZW50UGllY2UgPSBuZXcgYmxhY2tfMS5CbGFja0Jpc2hvcCh0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwiYmxhY2tcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJsYWNrLmtuaWdodHMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYGtuaWdodDoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyBibGFja18xLkJsYWNrS25pZ2h0KHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRDZWxscygpO1xuICAgICAgICAgICAgdGhpcy5zZXRJbml0aWFsUG9zaXRpb25zKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXdpbmcgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtqXS5kcmF3UmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkcmF3aW5nIGN1cnJlbnQgcG9zaXRpb24gcGllY2VzXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdEluZGV4KGksIGopO1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBjZWxsLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRyYXcoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJhd2luZyBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbFxuICAgICAgICAgICAgICAgICAgICAoX2IgPSB0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kcmF3U3Ryb2tlKFwiI2JjYzUzNjZiXCIsIDMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sYXN0TW92ZWRQaWVjZUNlbGxQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0TW92ZWRQaWVjZUNlbGxQb3NpdGlvbi5kcmF3U3Ryb2tlKFwiZGFya2dyZWVuXCIsIDMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwgJiYgdGhpcy5wb3NzaWJsZU1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucG9zc2libGVNb3Zlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY3VycmVudFBpZWNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZHJhd0NpcmNsZSh0aGlzLmNhbnZhcy5jdHgsIDYsIFwicmVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kcmF3Q2lyY2xlKHRoaXMuY2FudmFzLmN0eCwgNiwgXCIjYmNjNTM2NmJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZW5kZXIgY2FwdHVyZWQgcGllY2VzXG4gICAgICAgICAgICB0aGlzLmRyYXdDYXB0dXJlZFBpZWNlcygpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyYXdDYXB0dXJlZFBpZWNlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNhcHR1cmVkQnlXaGl0ZSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgY2FwdHVyZWRCeUJsYWNrID0gW107XG4gICAgICAgICAgICBsZXQgY2FwdHVyZWRCeVdoaXRlU3RyaW5nID0gXCItXCI7XG4gICAgICAgICAgICBsZXQgY2FwdHVyZWRCeUJsYWNrU3RyaW5nID0gXCItXCI7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2FwdHVyZWRQaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYXB0dXJlZFBpZWNlc1tpXS5jb2xvciA9PT0gXCJ3aGl0ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcHR1cmVkQnlCbGFjay5wdXNoKHRoaXMuY2FwdHVyZWRQaWVjZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZWRCeVdoaXRlLnB1c2godGhpcy5jYXB0dXJlZFBpZWNlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc29ydCBjYXB0dXJlZCBhcnJheXNcbiAgICAgICAgICAgIGNhcHR1cmVkQnlXaGl0ZS5zb3J0KChpLCBqKSA9PiBqLnBvaW50c1ZhbHVlIC0gaS5wb2ludHNWYWx1ZSk7XG4gICAgICAgICAgICBjYXB0dXJlZEJ5QmxhY2suc29ydCgoaSwgaikgPT4gai5wb2ludHNWYWx1ZSAtIGkucG9pbnRzVmFsdWUpO1xuICAgICAgICAgICAgLy8gdG90YWwgcG9pbnRzXG4gICAgICAgICAgICBjb25zdCBwb2ludHNCeVdoaXRlID0gY2FwdHVyZWRCeVdoaXRlLnJlZHVjZSgoc3VtLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1bSArIGN1cnIucG9pbnRzVmFsdWU7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIGNvbnN0IHBvaW50c0J5QmxhY2sgPSBjYXB0dXJlZEJ5QmxhY2sucmVkdWNlKChzdW0sIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VtICsgY3Vyci5wb2ludHNWYWx1ZTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgaWYgKGNhcHR1cmVkQnlXaGl0ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGA8c3BhbiBjbGFzcz1cInRleHQtc21cIj4gWyR7cG9pbnRzQnlXaGl0ZX1dPC9zcGFuPmA7XG4gICAgICAgICAgICAgICAgY2FwdHVyZWRCeVdoaXRlU3RyaW5nID1cbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZWRCeVdoaXRlLm1hcCgoaXRlbSkgPT4gaXRlbS51bmljb2RlKS5qb2luKFwiIFwiKSArIHNwYW47XG4gICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlZF9waWVjZXNfYnlfd2hpdGUuaW5uZXJIVE1MID0gY2FwdHVyZWRCeVdoaXRlU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhcHR1cmVkQnlCbGFjay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGA8c3BhbiBjbGFzcz1cInRleHQtc21cIj4gWyR7cG9pbnRzQnlCbGFja31dPC9zcGFuPmA7XG4gICAgICAgICAgICAgICAgY2FwdHVyZWRCeUJsYWNrU3RyaW5nID1cbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZWRCeUJsYWNrLm1hcCgoaXRlbSkgPT4gaXRlbS51bmljb2RlKS5qb2luKFwiIFwiKSArIHNwYW47XG4gICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlZF9waWVjZXNfYnlfYmxhY2suaW5uZXJIVE1MID0gY2FwdHVyZWRCeUJsYWNrU3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENlbGxCeUNvb3JkaW5hdGVzID0gKHgsIHkpID0+IHtcbiAgICAgICAgICAgIC8vIGxvb3Agb3ZlciBjZWxscyBhbmQgY2hlY2sgZm9yIHdoYXRldmVyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdEluZGV4KGksIGopO1xuICAgICAgICAgICAgICAgICAgICBpZiAoeCA+IGNlbGwueCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeCA8IGNlbGwueCArIHRoaXMuY2VsbFNpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPiBjZWxsLnkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPCBjZWxsLnkgKyB0aGlzLmNlbGxTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDZWxsQXRQb3NpdGlvbiA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleChwb3NpdGlvbik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDZWxsQXRJbmRleChpLCBqKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDZWxsQXRJbmRleCA9IChpLCBqKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1tpXVtqXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRQaWVjZUF0UG9zaXRpb24gPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvc2l0aW9uKTtcbiAgICAgICAgICAgIGlmICghY2VsbC5jdXJyZW50UGllY2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICByZXR1cm4gY2VsbC5jdXJyZW50UGllY2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0UG9zc2libGVNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgdGhpcy5wb3NzaWJsZU1vdmVzID0gY2VsbHM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGlzdGVuRm9yTW92ZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgcGxheUNhcHR1cmVTb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNlbGVjdGVkQ2VsbCAmJiB0aGlzLm5leHRTZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBjYXB0dXJpbmcgaWYgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheUNhcHR1cmVTb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdHVyZWRQaWVjZXMucHVzaCh0aGlzLm5leHRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gc2V0dGluZyBuZXh0IGNlbGwncyBuZXcgcGllY2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlLmhhc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWRDZWxsLmN1cnJlbnRQaWVjZTtcbiAgICAgICAgICAgICAgICAvLyBzZXR0aW5nIG5leHQgY2VsbCdzIHBpZWNlJ3MgcG9zaXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm5leHRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlLmN1cnJlbnRQb3NpdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFNlbGVjdGVkQ2VsbC5uYW1lO1xuICAgICAgICAgICAgICAgIC8vIHNldHRpbmcgbGFzdE1vdmVkUGllY2VDZWxsUG9zaXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RNb3ZlZFBpZWNlQ2VsbFBvc2l0aW9uID0gdGhpcy5uZXh0U2VsZWN0ZWRDZWxsO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92aW5nIGN1cnJlbnQgY2VsbCdzIHBpZWNlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWRDZWxsLmN1cnJlbnRQaWVjZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgLy8gY2xlYW51cCBhZnRlciBtb3ZlXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dGVtcGVkTmV4dFNlbGVjdGVkQ2VsbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAocGxheUNhcHR1cmVTb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmVTb3VuZC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTb3VuZC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMuY3VycmVudFBsYXllciA9PT0gXCJ3aGl0ZVwiID8gXCJibGFja1wiIDogXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5jYXB0dXJlU291bmQucHJlbG9hZCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLmNhcHR1cmVTb3VuZC5sb2FkKCk7XG4gICAgICAgIHRoaXMubW92ZVNvdW5kLnByZWxvYWQgPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy5tb3ZlU291bmQubG9hZCgpO1xuICAgIH1cbiAgICAvLyBsZW5ndGggJSA4IG11c3QgYmUgMFxuICAgIGdldCBsZW5ndGgoKSB7XG4gICAgICAgIGNvbnN0IGwgPSBNYXRoLm1pbih0aGlzLmNhbnZhcy5jLndpZHRoLCB0aGlzLmNhbnZhcy5jLmhlaWdodCkgKlxuICAgICAgICAgICAgR2xvYmFsc18xLkdsb2JhbHMuQk9BUkRfVE9fV0lORE9XX1JBVElPO1xuICAgICAgICBjb25zdCByZW1haW5pbmcgPSBsICUgODtcbiAgICAgICAgcmV0dXJuIGwgLSByZW1haW5pbmc7XG4gICAgfVxuICAgIGdldCBzdGFydFgoKSB7XG4gICAgICAgIHJldHVybiAod2luZG93LmlubmVyV2lkdGggLSB0aGlzLmxlbmd0aCkgLyAyO1xuICAgIH1cbiAgICBnZXQgc3RhcnRZKCkge1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5pbm5lckhlaWdodCAtIHRoaXMubGVuZ3RoKSAvIDI7XG4gICAgfVxuICAgIGdldCBjZWxsU2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoIC8gODtcbiAgICB9XG59XG5leHBvcnRzLkJvYXJkID0gQm9hcmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2FudmFzID0gdm9pZCAwO1xuY2xhc3MgQ2FudmFzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLmMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5jLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICB0aGlzLmMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkNhbnZhcyA9IENhbnZhcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DZWxsID0gdm9pZCAwO1xuY29uc3QgQmFzZUNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vQmFzZUNvbXBvbmVudFwiKTtcbmNsYXNzIENlbGwgZXh0ZW5kcyBCYXNlQ29tcG9uZW50XzEuQmFzZUNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgY2FudmFzLCB4LCB5LCBzaXplLCBjb2xvcikge1xuICAgICAgICBzdXBlcihuYW1lLCBjYW52YXMsIHgsIHksIHNpemUsIGNvbG9yKTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5jdXJyZW50UGllY2UgPSBudWxsO1xuICAgICAgICB0aGlzLmRyYXdDaXJjbGUgPSAoY3R4LCByYWRpdXMsIGNvbG9yKSA9PiB7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuY2VudGVyO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LmFyYyh4LCB5LCByYWRpdXMsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBjZW50ZXIoKSB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLnggKyB0aGlzLnNpemUgLyAyO1xuICAgICAgICBjb25zdCB5ID0gdGhpcy55ICsgdGhpcy5zaXplIC8gMjtcbiAgICAgICAgcmV0dXJuIHsgeCwgeSB9O1xuICAgIH1cbiAgICBzZXRDdXJyZW50UGllY2UocGllY2UpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50UGllY2UgPSBwaWVjZTtcbiAgICB9XG59XG5leHBvcnRzLkNlbGwgPSBDZWxsO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdhbWUgPSB2b2lkIDA7XG5jb25zdCBCb2FyZF8xID0gcmVxdWlyZShcIi4vQm9hcmRcIik7XG5jb25zdCBFdmVudFJ1bm5lcl8xID0gcmVxdWlyZShcIi4vZXZlbnRzL0V2ZW50UnVubmVyXCIpO1xuY29uc3QgSW5mb3JtYXRpb25TZXJ2aWNlXzEgPSByZXF1aXJlKFwiLi9JbmZvcm1hdGlvblNlcnZpY2VcIik7XG5jbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmRfMS5Cb2FyZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuX2V2ZW50UnVubmVyID0gbmV3IEV2ZW50UnVubmVyXzEuRXZlbnRSdW5uZXIodGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuX2luZm9ybWF0aW9uU2VydmljZSA9IG5ldyBJbmZvcm1hdGlvblNlcnZpY2VfMS5JbmZvcm1hdGlvblNlcnZpY2UodGhpcyk7XG4gICAgICAgIHRoaXMuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuaW5pdCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyYXcgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmRyYXcoKTtcbiAgICAgICAgICAgIHRoaXMuX2luZm9ybWF0aW9uU2VydmljZS51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQubGlzdGVuRm9yTW92ZXMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gVE9ETyBvbmx5IGZvciBkZXZcbiAgICAgICAgdGhpcy5wcmludFBpZWNlc09uQm9hcmQgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmJvYXJkLmNlbGxzW2ldW2pdLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWVjZTogdGhpcy5ib2FyZC5jZWxsc1tpXVtqXS5jdXJyZW50UGllY2UsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkdhbWUgPSBHYW1lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkluZm9ybWF0aW9uU2VydmljZSA9IHZvaWQgMDtcbmNsYXNzIEluZm9ybWF0aW9uU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiOnJvb3RcIik7XG4gICAgICAgIHRoaXMudXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1jdXJyZW50LXBsYXllclwiLCB0aGlzLmdhbWUuYm9hcmQuY3VycmVudFBsYXllcik7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5JbmZvcm1hdGlvblNlcnZpY2UgPSBJbmZvcm1hdGlvblNlcnZpY2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2xpY2tFdmVudHMgPSB2b2lkIDA7XG5jbGFzcyBDbGlja0V2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3RpbmdDZWxscyA9IChjZWxsKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgaWYgKGNlbGwuY3VycmVudFBpZWNlICYmXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50UGxheWVyID09PSBjZWxsLmN1cnJlbnRQaWVjZS5jb2xvciAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmJvYXJkLmF0dGVtcGVkTmV4dFNlbGVjdGVkQ2VsbCAmJlxuICAgICAgICAgICAgICAgICF0aGlzLmJvYXJkLm5leHRTZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBTZWxlY3RpbmcgY3VycmVudFNlbGVjdGVkQ2VsbFxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQuY3VycmVudFNlbGVjdGVkQ2VsbCA9IGNlbGw7XG4gICAgICAgICAgICAgICAgY29uc3QgcG9zc2libGVNb3ZlcyA9ICgoX2EgPSB0aGlzLmJvYXJkLmN1cnJlbnRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZ2V0VmFsaWRNb3Zlcyh0aGlzLmJvYXJkLmNlbGxzKSkgfHwgW107XG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5zZXRQb3NzaWJsZU1vdmVzKHBvc3NpYmxlTW92ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5ib2FyZC5jdXJyZW50U2VsZWN0ZWRDZWxsICYmICF0aGlzLmJvYXJkLm5leHRTZWxlY3RlZENlbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBTZWxlY3RpbmcgYXR0ZW1wZWROZXh0U2VsZWN0ZWRDZWxsXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5hdHRlbXBlZE5leHRTZWxlY3RlZENlbGwgPSBjZWxsO1xuICAgICAgICAgICAgICAgIGlmICgoX2IgPSB0aGlzLmJvYXJkLmN1cnJlbnRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaXNWYWxpZE1vdmUodGhpcy5ib2FyZC5jZWxscywgY2VsbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0aW5nIG5leHRTZWxlY3RlZENlbGxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5uZXh0U2VsZWN0ZWRDZWxsID0gY2VsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5zZXRQb3NzaWJsZU1vdmVzKFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGxCeUNvb3JkaW5hdGVzKGV2ZW50LngsIGV2ZW50LnkpO1xuICAgICAgICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGluZ0NlbGxzKGNlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkNsaWNrRXZlbnRzID0gQ2xpY2tFdmVudHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRXZlbnRSdW5uZXIgPSB2b2lkIDA7XG5jb25zdCBDbGlja0V2ZW50c18xID0gcmVxdWlyZShcIi4vQ2xpY2tFdmVudHNcIik7XG5jb25zdCBSZXNpemVFdmVudHNfMSA9IHJlcXVpcmUoXCIuL1Jlc2l6ZUV2ZW50c1wiKTtcbmNsYXNzIEV2ZW50UnVubmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHRoaXMuX3Jlc2l6ZUV2ZW50cyA9IG5ldyBSZXNpemVFdmVudHNfMS5SZXNpemVFdmVudHModGhpcy5ib2FyZCk7XG4gICAgICAgIHRoaXMuX2NsaWNrRXZlbnRzID0gbmV3IENsaWNrRXZlbnRzXzEuQ2xpY2tFdmVudHModGhpcy5ib2FyZCk7XG4gICAgfVxufVxuZXhwb3J0cy5FdmVudFJ1bm5lciA9IEV2ZW50UnVubmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJlc2l6ZUV2ZW50cyA9IHZvaWQgMDtcbmNsYXNzIFJlc2l6ZUV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoYm9hcmQpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICAvLyBGSVhNRSByZXNpemUgY2VsbHMgYW5kIHBpZWNlIHBvc2l0aW9uc1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmNhbnZhcy5jLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgICB0aGlzLmJvYXJkLmNhbnZhcy5jLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5SZXNpemVFdmVudHMgPSBSZXNpemVFdmVudHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFzZVBpZWNlID0gdm9pZCAwO1xuY29uc3QgQmFzZUNvbXBvbmVudF8xID0gcmVxdWlyZShcIi4uL0Jhc2VDb21wb25lbnRcIik7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNsYXNzIEJhc2VQaWVjZSBleHRlbmRzIEJhc2VDb21wb25lbnRfMS5CYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCwgaW5pdGlhbFBvc2l0aW9uLCBjdXJyZW50UG9zaXRpb24sIG5hbWUsIGNhbnZhcywgeCwgeSwgc2l6ZSwgY29sb3IpIHtcbiAgICAgICAgc3VwZXIobmFtZSwgY2FudmFzLCB4LCB5LCBzaXplLCBjb2xvcik7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy5pbml0aWFsUG9zaXRpb24gPSBpbml0aWFsUG9zaXRpb247XG4gICAgICAgIHRoaXMuY3VycmVudFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGllY2VzXCIpO1xuICAgICAgICB0aGlzLmhhc01vdmVkID0gZmFsc2U7XG4gICAgICAgIC8vIFRPRE8gcGlubmVkIHBpZWNlcyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gaXNWYWxpZE1vdmVcbiAgICAgICAgdGhpcy5pc1Bpbm5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYXdVbmljb2RlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZm9udCA9IGAke3RoaXMuc2l6ZX1weCBhcmlhbGA7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZmlsbFRleHQodGhpcy51bmljb2RlLCB0aGlzLngsIHRoaXMueSk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBkcmF3KCkge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldENlbGxDZW50ZXJCeU5hbWUodGhpcy5ib2FyZC5jZWxscywgdGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICBjb25zdCBzV2lkdGggPSB0aGlzLmltZy5uYXR1cmFsV2lkdGggLyA2O1xuICAgICAgICBjb25zdCBzSGVpZ2h0ID0gdGhpcy5pbWcubmF0dXJhbEhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IHsgaW1nVywgaW1nSCwgaW1nT2Zmc2V0WCwgaW1nT2Zmc2V0WSB9ID0gdGhpcy5nZXRJbWFnZUNvb3JkaW5hdGVzKCk7XG4gICAgICAgIGNvbnN0IHN4ID0gc1dpZHRoICogaW1nVztcbiAgICAgICAgY29uc3Qgc3kgPSBzSGVpZ2h0ICogaW1nSDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0WCA9IHNXaWR0aCAvIGltZ09mZnNldFg7XG4gICAgICAgIGNvbnN0IG9mZnNldFkgPSBzSGVpZ2h0IC8gaW1nT2Zmc2V0WTtcbiAgICAgICAgY29uc3QgZHggPSB4IC0gb2Zmc2V0WDtcbiAgICAgICAgY29uc3QgZHkgPSB5IC0gb2Zmc2V0WTtcbiAgICAgICAgY29uc3QgZFdpZHRoID0gNTA7XG4gICAgICAgIGNvbnN0IGRIZWlnaHQgPSA1MDtcbiAgICAgICAgdGhpcy5jYW52YXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgc3gsIHN5LCBzV2lkdGgsIHNIZWlnaHQsIGR4LCBkeSwgZFdpZHRoLCBkSGVpZ2h0KTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VQaWVjZSA9IEJhc2VQaWVjZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CaXNob3AgPSB2b2lkIDA7XG5jb25zdCBCYXNlUGllY2VfMSA9IHJlcXVpcmUoXCIuL0Jhc2VQaWVjZVwiKTtcbmNsYXNzIEJpc2hvcCBleHRlbmRzIEJhc2VQaWVjZV8xLkJhc2VQaWVjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9pbnRzVmFsdWUgPSAzO1xuICAgIH1cbn1cbmV4cG9ydHMuQmlzaG9wID0gQmlzaG9wO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLktpbmcgPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IEJhc2VQaWVjZV8xID0gcmVxdWlyZShcIi4vQmFzZVBpZWNlXCIpO1xuY2xhc3MgS2luZyBleHRlbmRzIEJhc2VQaWVjZV8xLkJhc2VQaWVjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9pbnRzVmFsdWUgPSA5OTk7XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIC8vIGZyb20gd2hpdGUncyBwZXJzcGVjdGl2ZVxuICAgICAgICAgICAgY29uc3QgdGFibGUgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInVwXCIsXG4gICAgICAgICAgICAgICAgICAgIHg6IGkgLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBqLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImRvd25cIixcbiAgICAgICAgICAgICAgICAgICAgeDogaSArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGosXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibGVmdFwiLFxuICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICB5OiBqIC0gMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJyaWdodFwiLFxuICAgICAgICAgICAgICAgICAgICB4OiBpLFxuICAgICAgICAgICAgICAgICAgICB5OiBqICsgMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJ0b3AtcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgeDogaSAtIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGogKyAxLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInRvcC1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHg6IGkgLSAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBqIC0gMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJib3R0b20tcmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgeDogaSArIDEsXG4gICAgICAgICAgICAgICAgICAgIHk6IGogKyAxLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImJvdHRvbS1sZWZ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHg6IGkgKyAxLFxuICAgICAgICAgICAgICAgICAgICB5OiBqIC0gMSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRhYmxlLmZvckVhY2goKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZCh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbHNbeF1beV0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbn1cbmV4cG9ydHMuS2luZyA9IEtpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuS25pZ2h0ID0gdm9pZCAwO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4uL3V0aWxzL0NlbGxIZWxwZXJcIik7XG5jb25zdCBCYXNlUGllY2VfMSA9IHJlcXVpcmUoXCIuL0Jhc2VQaWVjZVwiKTtcbmNsYXNzIEtuaWdodCBleHRlbmRzIEJhc2VQaWVjZV8xLkJhc2VQaWVjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9pbnRzVmFsdWUgPSAzO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXMgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXRMTW92ZW1lbnRDZWxsc0Zyb21JbmRleChjZWxscywgaSwgaik7XG4gICAgICAgICAgICByZXR1cm4gbW92ZXMuZmlsdGVyKChjZWxsKSA9PiB7IHZhciBfYTsgcmV0dXJuICgoX2EgPSBjZWxsLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbG9yKSAhPT0gdGhpcy5jb2xvcjsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG59XG5leHBvcnRzLktuaWdodCA9IEtuaWdodDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5QYXduID0gdm9pZCAwO1xuY29uc3QgQmFzZVBpZWNlXzEgPSByZXF1aXJlKFwiLi9CYXNlUGllY2VcIik7XG5jbGFzcyBQYXduIGV4dGVuZHMgQmFzZVBpZWNlXzEuQmFzZVBpZWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wb2ludHNWYWx1ZSA9IDE7XG4gICAgfVxufVxuZXhwb3J0cy5QYXduID0gUGF3bjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5RdWVlbiA9IHZvaWQgMDtcbmNvbnN0IEJhc2VQaWVjZV8xID0gcmVxdWlyZShcIi4vQmFzZVBpZWNlXCIpO1xuY2xhc3MgUXVlZW4gZXh0ZW5kcyBCYXNlUGllY2VfMS5CYXNlUGllY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnBvaW50c1ZhbHVlID0gOTtcbiAgICB9XG59XG5leHBvcnRzLlF1ZWVuID0gUXVlZW47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUm9vayA9IHZvaWQgMDtcbmNvbnN0IEJhc2VQaWVjZV8xID0gcmVxdWlyZShcIi4vQmFzZVBpZWNlXCIpO1xuY2xhc3MgUm9vayBleHRlbmRzIEJhc2VQaWVjZV8xLkJhc2VQaWVjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9pbnRzVmFsdWUgPSA1O1xuICAgIH1cbn1cbmV4cG9ydHMuUm9vayA9IFJvb2s7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmxhY2tCaXNob3AgPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBCaXNob3BfMSA9IHJlcXVpcmUoXCIuLi9CaXNob3BcIik7XG5jbGFzcyBCbGFja0Jpc2hvcCBleHRlbmRzIEJpc2hvcF8xLkJpc2hvcCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuQmxhY2suQmlzaG9wO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXMgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXQ0NURlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleChcImJsYWNrXCIsIGNlbGxzLCBpLCBqKTtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogMixcbiAgICAgICAgICAgIGltZ0g6IDEsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiAxMS41LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTIsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5CbGFja0Jpc2hvcCA9IEJsYWNrQmlzaG9wO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrS2luZyA9IHZvaWQgMDtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBLaW5nXzEgPSByZXF1aXJlKFwiLi4vS2luZ1wiKTtcbmNsYXNzIEJsYWNrS2luZyBleHRlbmRzIEtpbmdfMS5LaW5nIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5CbGFjay5LaW5nO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgaXNWYWxpZE1vdmUoY2VsbHM6IENlbGxbXVtdLCBuZXh0Q2VsbDogQ2VsbCk6IGJvb2xlYW4ge1xuICAgIC8vICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfVxuICAgIC8vIHB1YmxpYyBnZXRWYWxpZE1vdmVzID0gKGNlbGxzOiBDZWxsW11bXSk6IENlbGxbXSA9PiB7XG4gICAgLy8gICByZXR1cm4gW107XG4gICAgLy8gfTtcbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogMCxcbiAgICAgICAgICAgIGltZ0g6IDEsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiAxNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDExLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQmxhY2tLaW5nID0gQmxhY2tLaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrS25pZ2h0ID0gdm9pZCAwO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IEtuaWdodF8xID0gcmVxdWlyZShcIi4uL0tuaWdodFwiKTtcbmNsYXNzIEJsYWNrS25pZ2h0IGV4dGVuZHMgS25pZ2h0XzEuS25pZ2h0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5CbGFjay5LbmlnaHQ7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiAzLFxuICAgICAgICAgICAgaW1nSDogMSxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDEwLjUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMixcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkJsYWNrS25pZ2h0ID0gQmxhY2tLbmlnaHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmxhY2tQYXduID0gdm9pZCAwO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL0NlbGxIZWxwZXJcIik7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgUGF3bl8xID0gcmVxdWlyZShcIi4uL1Bhd25cIik7XG5jbGFzcyBCbGFja1Bhd24gZXh0ZW5kcyBQYXduXzEuUGF3biB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuQmxhY2suUGF3bjtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tpICsgMl1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAyXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgKyAxLCBqKSAmJlxuICAgICAgICAgICAgICAgIGNlbGxzW2kgKyAxXVtqXS5jdXJyZW50UGllY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgKyAxLCBqIC0gMSkgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpICsgMV1baiAtIDFdLmN1cnJlbnRQaWVjZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICgoX2EgPSBjZWxsc1tpICsgMV1baiAtIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqIC0gMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgKyAxLCBqICsgMSkgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpICsgMV1baiArIDFdLmN1cnJlbnRQaWVjZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICgoX2IgPSBjZWxsc1tpICsgMV1baiArIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogNSxcbiAgICAgICAgICAgIGltZ0g6IDEsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiA5LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTEsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5CbGFja1Bhd24gPSBCbGFja1Bhd247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmxhY2tRdWVlbiA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IFF1ZWVuXzEgPSByZXF1aXJlKFwiLi4vUXVlZW5cIik7XG5jbGFzcyBCbGFja1F1ZWVuIGV4dGVuZHMgUXVlZW5fMS5RdWVlbiB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuQmxhY2suUXVlZW47XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCBtb3ZlczQ1ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0NDVEZWdyZWVDZWxsc0lmRW1wdHlGcm9tSW5kZXgoXCJibGFja1wiLCBjZWxscywgaSwgaik7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbLi4ubW92ZXM0NV07XG4gICAgICAgICAgICBjb25zdCBtb3ZlczkwID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0OTBEZWdyZWVDZWxsc0lmRW1wdHlGcm9tSW5kZXgoXCJibGFja1wiLCBjZWxscywgaSwgaik7XG4gICAgICAgICAgICBtb3ZlczkwLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5pbmNsdWRlcyhjZWxsKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDEsXG4gICAgICAgICAgICBpbWdIOiAxLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTQsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMixcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkJsYWNrUXVlZW4gPSBCbGFja1F1ZWVuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrUm9vayA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IFJvb2tfMSA9IHJlcXVpcmUoXCIuLi9Sb29rXCIpO1xuY2xhc3MgQmxhY2tSb29rIGV4dGVuZHMgUm9va18xLlJvb2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLkJsYWNrLlJvb2s7XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCBtb3ZlcyA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDkwRGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwiYmxhY2tcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiA0LFxuICAgICAgICAgICAgaW1nSDogMSxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDkuNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDEyLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQmxhY2tSb29rID0gQmxhY2tSb29rO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9CbGFja0Jpc2hvcFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tLaW5nXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9CbGFja0tuaWdodFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tQYXduXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9CbGFja1F1ZWVuXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9CbGFja1Jvb2tcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldoaXRlQmlzaG9wID0gdm9pZCAwO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL0NlbGxIZWxwZXJcIik7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgQmlzaG9wXzEgPSByZXF1aXJlKFwiLi4vQmlzaG9wXCIpO1xuY2xhc3MgV2hpdGVCaXNob3AgZXh0ZW5kcyBCaXNob3BfMS5CaXNob3Age1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLkJpc2hvcDtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0NDVEZWdyZWVDZWxsc0lmRW1wdHlGcm9tSW5kZXgoXCJ3aGl0ZVwiLCBjZWxscywgaSwgaik7XG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDIsXG4gICAgICAgICAgICBpbWdIOiAwLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTEuNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDE0LFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuV2hpdGVCaXNob3AgPSBXaGl0ZUJpc2hvcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZUtpbmcgPSB2b2lkIDA7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgS2luZ18xID0gcmVxdWlyZShcIi4uL0tpbmdcIik7XG5jbGFzcyBXaGl0ZUtpbmcgZXh0ZW5kcyBLaW5nXzEuS2luZyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuV2hpdGUuS2luZztcbiAgICB9XG4gICAgLy8gcHVibGljIGlzVmFsaWRNb3ZlKGNlbGxzOiBDZWxsW11bXSwgbmV4dENlbGw6IENlbGwpOiBib29sZWFuIHtcbiAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cbiAgICAvLyBwdWJsaWMgZ2V0VmFsaWRNb3ZlcyA9IChjZWxsczogQ2VsbFtdW10pOiBDZWxsW10gPT4ge1xuICAgIC8vICAgcmV0dXJuIFtdO1xuICAgIC8vIH07XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDAsXG4gICAgICAgICAgICBpbWdIOiAwLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldoaXRlS2luZyA9IFdoaXRlS2luZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZUtuaWdodCA9IHZvaWQgMDtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBLbmlnaHRfMSA9IHJlcXVpcmUoXCIuLi9LbmlnaHRcIik7XG5jbGFzcyBXaGl0ZUtuaWdodCBleHRlbmRzIEtuaWdodF8xLktuaWdodCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuV2hpdGUuS25pZ2h0O1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogMyxcbiAgICAgICAgICAgIGltZ0g6IDAsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiAxMC41LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5XaGl0ZUtuaWdodCA9IFdoaXRlS25pZ2h0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldoaXRlUGF3biA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IFBhd25fMSA9IHJlcXVpcmUoXCIuLi9QYXduXCIpO1xuY2xhc3MgV2hpdGVQYXduIGV4dGVuZHMgUGF3bl8xLlBhd24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLlBhd247XG4gICAgICAgIHRoaXMuaXNWYWxpZE1vdmUgPSAoY2VsbHMsIG5leHRDZWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tpIC0gMl1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAyXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgLSAxLCBqKSAmJlxuICAgICAgICAgICAgICAgIGNlbGxzW2kgLSAxXVtqXS5jdXJyZW50UGllY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMV1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgLSAxLCBqIC0gMSkgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpIC0gMV1baiAtIDFdLmN1cnJlbnRQaWVjZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICgoX2EgPSBjZWxsc1tpIC0gMV1baiAtIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAxXVtqIC0gMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgLSAxLCBqICsgMSkgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpIC0gMV1baiArIDFdLmN1cnJlbnRQaWVjZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICgoX2IgPSBjZWxsc1tpIC0gMV1baiArIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAxXVtqICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDUsXG4gICAgICAgICAgICBpbWdIOiAwLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogOSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDEzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuV2hpdGVQYXduID0gV2hpdGVQYXduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldoaXRlUXVlZW4gPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBRdWVlbl8xID0gcmVxdWlyZShcIi4uL1F1ZWVuXCIpO1xuY2xhc3MgV2hpdGVRdWVlbiBleHRlbmRzIFF1ZWVuXzEuUXVlZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLlF1ZWVuO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXM0NSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDQ1RGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwid2hpdGVcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gWy4uLm1vdmVzNDVdO1xuICAgICAgICAgICAgY29uc3QgbW92ZXM5MCA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDkwRGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwid2hpdGVcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgbW92ZXM5MC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuaW5jbHVkZXMoY2VsbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiAxLFxuICAgICAgICAgICAgaW1nSDogMCxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDE0LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTQuNSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldoaXRlUXVlZW4gPSBXaGl0ZVF1ZWVuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldoaXRlUm9vayA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IFJvb2tfMSA9IHJlcXVpcmUoXCIuLi9Sb29rXCIpO1xuY2xhc3MgV2hpdGVSb29rIGV4dGVuZHMgUm9va18xLlJvb2sge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLlJvb2s7XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCBtb3ZlcyA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDkwRGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwid2hpdGVcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiA0LFxuICAgICAgICAgICAgaW1nSDogMCxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDkuNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDEzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuV2hpdGVSb29rID0gV2hpdGVSb29rO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9XaGl0ZUJpc2hvcFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVLaW5nXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9XaGl0ZUtuaWdodFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVQYXduXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9XaGl0ZVF1ZWVuXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9XaGl0ZVJvb2tcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdhbWUgPSBleHBvcnRzLmNhbnZhcyA9IHZvaWQgMDtcbmNvbnN0IENhbnZhc18xID0gcmVxdWlyZShcIi4vQ2FudmFzXCIpO1xuY29uc3QgR2FtZV8xID0gcmVxdWlyZShcIi4vR2FtZVwiKTtcbmV4cG9ydHMuY2FudmFzID0gbmV3IENhbnZhc18xLkNhbnZhcygpO1xuZXhwb3J0cy5nYW1lID0gbmV3IEdhbWVfMS5HYW1lKGV4cG9ydHMuY2FudmFzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9hO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DZWxsSGVscGVyID0gdm9pZCAwO1xuY2xhc3MgQ2VsbEhlbHBlciB7XG4gICAgc3RhdGljIEluZGV4VG9OYW1lKGksIGopIHtcbiAgICAgICAgLy8gMCwgMCAtPiBhOFxuICAgICAgICAvLyAzLCAyIC0+IGI1XG4gICAgICAgIGNvbnN0IG51bSA9IDggLSBpO1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJhYmNkZWZnaFwiO1xuICAgICAgICBjb25zdCBjaGFyID0gbGV0dGVyc1tqXTtcbiAgICAgICAgcmV0dXJuIGNoYXIgKyBudW07XG4gICAgfVxuICAgIHN0YXRpYyBOYW1lVG9JbmRleChuYW1lKSB7XG4gICAgICAgIGNvbnN0IGxldHRlcnMgPSBcImFiY2RlZmdoXCI7XG4gICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChuYW1lLmxlbmd0aCAhPT0gMilcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNlbGwgbmFtZSBtdXN0IGJlIGxlbmd0aCAyXCIpO1xuICAgICAgICBjb25zdCBudW0gPSBwYXJzZUludChuYW1lWzFdKTtcbiAgICAgICAgaWYgKG51bSA+IDggfHwgbnVtIDwgMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk51bWJlciBtdXN0IGJlIGJldHdlZW4gMS04XCIpO1xuICAgICAgICBjb25zdCBqID0gbGV0dGVycy5pbmRleE9mKG5hbWVbMF0pO1xuICAgICAgICBjb25zdCBpID0gOCAtIG51bTtcbiAgICAgICAgaWYgKGkgPT09IC0xKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidmFsaWQgbGV0dGVycyB7YSxiLGMsZSxkLGYsZyxofVwiKTtcbiAgICAgICAgcmV0dXJuIHsgaSwgaiB9O1xuICAgIH1cbiAgICBzdGF0aWMgR2V0Q2VsbENlbnRlckJ5TmFtZShjZWxscywgbmFtZSkge1xuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCB7IGksIGogfSA9IHRoaXMuTmFtZVRvSW5kZXgobmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLkdldENlbGxDZW50ZXJCeUluZGV4ZXMoY2VsbHMsIGksIGopO1xuICAgIH1cbiAgICBzdGF0aWMgR2V0Q2VsbENlbnRlckJ5SW5kZXhlcyhjZWxscywgaSwgaikge1xuICAgICAgICBjb25zdCBjZWxsID0gY2VsbHNbaV1bal07XG4gICAgICAgIHJldHVybiBjZWxsLmNlbnRlcjtcbiAgICB9XG4gICAgc3RhdGljIERyYXdDZWxsTmFtZVRvQm9hcmQobmFtZSwgYm9hcmQsIGN0eCkge1xuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBmb250U2l6ZSA9IGJvYXJkLmNlbGxTaXplICogMC41O1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICBjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4IGFyaWFsYDtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLkdldENlbGxDZW50ZXJCeU5hbWUoYm9hcmQuY2VsbHMsIG5hbWUpO1xuICAgICAgICBjdHguZmlsbFRleHQobmFtZSwgeCAtIGZvbnRTaXplIC8gMiwgeSArIGZvbnRTaXplIC8gNCk7XG4gICAgfVxuICAgIHN0YXRpYyBHZXRJbml0aWFsUG9zaXRpb25zKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2hpdGU6IHtcbiAgICAgICAgICAgICAgICBwYXduczogW1wiYTJcIiwgXCJiMlwiLCBcImMyXCIsIFwiZTJcIiwgXCJkMlwiLCBcImYyXCIsIFwiZzJcIiwgXCJoMlwiXSxcbiAgICAgICAgICAgICAgICByb29rczogW1wiYTFcIiwgXCJoMVwiXSxcbiAgICAgICAgICAgICAgICBrbmlnaHRzOiBbXCJiMVwiLCBcImcxXCJdLFxuICAgICAgICAgICAgICAgIGJpc2hvcHM6IFtcImMxXCIsIFwiZjFcIl0sXG4gICAgICAgICAgICAgICAgcXVlZW46IFwiZDFcIixcbiAgICAgICAgICAgICAgICBraW5nOiBcImUxXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmxhY2s6IHtcbiAgICAgICAgICAgICAgICBwYXduczogW1wiYTdcIiwgXCJiN1wiLCBcImM3XCIsIFwiZTdcIiwgXCJkN1wiLCBcImY3XCIsIFwiZzdcIiwgXCJoN1wiXSxcbiAgICAgICAgICAgICAgICByb29rczogW1wiYThcIiwgXCJoOFwiXSxcbiAgICAgICAgICAgICAgICBrbmlnaHRzOiBbXCJiOFwiLCBcImc4XCJdLFxuICAgICAgICAgICAgICAgIGJpc2hvcHM6IFtcImM4XCIsIFwiZjhcIl0sXG4gICAgICAgICAgICAgICAgcXVlZW46IFwiZDhcIixcbiAgICAgICAgICAgICAgICBraW5nOiBcImU4XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQ2VsbEhlbHBlciA9IENlbGxIZWxwZXI7XG5fYSA9IENlbGxIZWxwZXI7XG5DZWxsSGVscGVyLklzQ2VsbFZhbGlkID0gKGksIGopID0+IHtcbiAgICByZXR1cm4gaSA+PSAwICYmIGkgPD0gNyAmJiBqID49IDAgJiYgaiA8PSA3O1xufTtcbkNlbGxIZWxwZXIuR2V0OTBEZWdyZWVDZWxsc0lmRW1wdHlGcm9tSW5kZXggPSAoZnJvbUNvbG9yVHlwZSwgY2VsbHMsIGksIGopID0+IHtcbiAgICB2YXIgX2IsIF9jLCBfZCwgX2U7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgLy8gZ29pbmcgcmlnaHRcbiAgICBsZXQgeCA9IGkgKyAxO1xuICAgIHdoaWxlICh4IDw9IDcpIHtcbiAgICAgICAgaWYgKGNlbGxzW3hdW2pdLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2IgPSBjZWxsc1t4XVtqXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW2pdKTtcbiAgICAgICAgfVxuICAgICAgICB4Kys7XG4gICAgfVxuICAgIC8vIGdvaW5nIGxlZnRcbiAgICB4ID0gaSAtIDE7XG4gICAgd2hpbGUgKHggPj0gMCkge1xuICAgICAgICBpZiAoY2VsbHNbeF1bal0uY3VycmVudFBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoKChfYyA9IGNlbGxzW3hdW2pdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNvbG9yKSAhPT0gZnJvbUNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1bal0pO1xuICAgICAgICB9XG4gICAgICAgIHgtLTtcbiAgICB9XG4gICAgLy8gZ29pbmcgdG9wXG4gICAgbGV0IHkgPSBqIC0gMTtcbiAgICB3aGlsZSAoeSA+PSAwKSB7XG4gICAgICAgIGlmIChjZWxsc1tpXVt5XS5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgIGlmICgoKF9kID0gY2VsbHNbaV1beV0uY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuY29sb3IpICE9PSBmcm9tQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1beV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpXVt5XSk7XG4gICAgICAgIH1cbiAgICAgICAgeS0tO1xuICAgIH1cbiAgICB5ID0gaiArIDE7XG4gICAgd2hpbGUgKHkgPD0gNykge1xuICAgICAgICBpZiAoY2VsbHNbaV1beV0uY3VycmVudFBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoKChfZSA9IGNlbGxzW2ldW3ldLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLmNvbG9yKSAhPT0gZnJvbUNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2ldW3ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1beV0pO1xuICAgICAgICB9XG4gICAgICAgIHkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5DZWxsSGVscGVyLkdldDQ1RGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4ID0gKGZyb21Db2xvclR5cGUsIGNlbGxzLCBpLCBqKSA9PiB7XG4gICAgdmFyIF9iLCBfYywgX2QsIF9lO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIC8vIGdvaW5nIHRvcC1yaWdodFxuICAgIGxldCB4ID0gaSAtIDE7XG4gICAgbGV0IHkgPSBqICsgMTtcbiAgICB3aGlsZSAoeCA+PSAwICYmIHkgPD0gNykge1xuICAgICAgICBpZiAoY2VsbHNbeF1beV0uY3VycmVudFBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoKChfYiA9IGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNvbG9yKSAhPT0gZnJvbUNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1beV0pO1xuICAgICAgICB9XG4gICAgICAgIHgtLTtcbiAgICAgICAgeSsrO1xuICAgIH1cbiAgICAvLyBnb2luZyBib3R0b20tbGVmdFxuICAgIHggPSBpICsgMTtcbiAgICB5ID0gaiAtIDE7XG4gICAgd2hpbGUgKHggPD0gNyAmJiB5ID49IDApIHtcbiAgICAgICAgaWYgKGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2MgPSBjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgfVxuICAgICAgICB4Kys7XG4gICAgICAgIHktLTtcbiAgICB9XG4gICAgLy8gZ29pbmcgdG9wLWxlZnRcbiAgICB4ID0gaSAtIDE7XG4gICAgeSA9IGogLSAxO1xuICAgIHdoaWxlICh4ID49IDAgJiYgeSA+PSAwKSB7XG4gICAgICAgIGlmIChjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgIGlmICgoKF9kID0gY2VsbHNbeF1beV0uY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2QuY29sb3IpICE9PSBmcm9tQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1beV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgIH1cbiAgICAgICAgeC0tO1xuICAgICAgICB5LS07XG4gICAgfVxuICAgIC8vIGdvaW5nIGJvdHRvbS1yaWdodFxuICAgIHggPSBpICsgMTtcbiAgICB5ID0gaiArIDE7XG4gICAgd2hpbGUgKHggPD0gNyAmJiB5IDw9IDcpIHtcbiAgICAgICAgaWYgKGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2UgPSBjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgfVxuICAgICAgICB4Kys7XG4gICAgICAgIHkrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5DZWxsSGVscGVyLkdldExNb3ZlbWVudENlbGxzRnJvbUluZGV4ID0gKGNlbGxzLCBpLCBqKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgLy8gOCBwb3NzaWJsZSBtb3ZlcyBhIGtuaWdodCBjYW4gbWFrZSBpZiB2YWxpZFxuICAgIC8vIHRvcC1yaWdodFxuICAgIGlmIChfYS5Jc0NlbGxWYWxpZChpIC0gMiwgaiArIDEpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAyXVtqICsgMV0pO1xuICAgIH1cbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSAtIDEsIGogKyAyKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMV1baiArIDJdKTtcbiAgICB9XG4gICAgLy8gYm90dG9tLXJpZ2h0XG4gICAgaWYgKF9hLklzQ2VsbFZhbGlkKGkgKyAxLCBqICsgMikpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSArIDFdW2ogKyAyXSk7XG4gICAgfVxuICAgIGlmIChfYS5Jc0NlbGxWYWxpZChpICsgMiwgaiArIDEpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAyXVtqICsgMV0pO1xuICAgIH1cbiAgICAvLyBib3R0b20tbGVmdFxuICAgIGlmIChfYS5Jc0NlbGxWYWxpZChpICsgMSwgaiAtIDIpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqIC0gMl0pO1xuICAgIH1cbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSArIDIsIGogLSAxKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMl1baiAtIDFdKTtcbiAgICB9XG4gICAgLy8gdG9wLWxlZnRcbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSAtIDEsIGogLSAyKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMV1baiAtIDJdKTtcbiAgICB9XG4gICAgaWYgKF9hLklzQ2VsbFZhbGlkKGkgLSAyLCBqIC0gMSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSAtIDJdW2ogLSAxXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdsb2JhbHMgPSB2b2lkIDA7XG5jbGFzcyBHbG9iYWxzIHtcbn1cbmV4cG9ydHMuR2xvYmFscyA9IEdsb2JhbHM7XG5HbG9iYWxzLkJPQVJEX1RPX1dJTkRPV19SQVRJTyA9IDAuODtcbkdsb2JhbHMuQkxBQ0tfQ0VMTF9DT0xPUiA9IFwiI2JhODg2NlwiO1xuR2xvYmFscy5XSElURV9DRUxMX0NPTE9SID0gXCIjZjVkOWI5XCI7XG5HbG9iYWxzLkxBU1RfTU9WRURfQ09MT1IgPSBcIiNjZmQwODNcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5SbmQgPSB2b2lkIDA7XG5jbGFzcyBSbmQge1xuICAgIHN0YXRpYyBHZW5lcmF0ZUlkKCkge1xuICAgICAgICByZXR1cm4gKE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpICsgXCIwMDAwMDAwMDAwMDAwMDAwMFwiKS5zbGljZSgyLCA1ICsgMik7XG4gICAgfVxufVxuZXhwb3J0cy5SbmQgPSBSbmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVW5pY29kZUNoYXJhY3RlcnMgPSB2b2lkIDA7XG5leHBvcnRzLlVuaWNvZGVDaGFyYWN0ZXJzID0ge1xuICAgIFdoaXRlOiB7XG4gICAgICAgIEtpbmc6IFwi4pmUXCIsXG4gICAgICAgIFF1ZWVuOiBcIuKZlVwiLFxuICAgICAgICBSb29rOiBcIuKZllwiLFxuICAgICAgICBCaXNob3A6IFwi4pmXXCIsXG4gICAgICAgIEtuaWdodDogXCLimZhcIixcbiAgICAgICAgUGF3bjogXCLimZlcIixcbiAgICB9LFxuICAgIEJsYWNrOiB7XG4gICAgICAgIEtpbmc6IFwi4pmaXCIsXG4gICAgICAgIFF1ZWVuOiBcIuKZm1wiLFxuICAgICAgICBSb29rOiBcIuKZnFwiLFxuICAgICAgICBCaXNob3A6IFwi4pmdXCIsXG4gICAgICAgIEtuaWdodDogXCLimZ5cIixcbiAgICAgICAgUGF3bjogXCLimZ9cIixcbiAgICB9LFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHVwXzEgPSByZXF1aXJlKFwiLi9zZXR1cFwiKTtcbnNldHVwXzEuZ2FtZS5pbml0KCk7XG5zZXR1cF8xLmdhbWUuZHJhdygpO1xuZnVuY3Rpb24gbWFpbigpIHtcbiAgICBzZXR1cF8xLmdhbWUuY2FudmFzLmN0eC5jbGVhclJlY3QoMCwgMCwgc2V0dXBfMS5nYW1lLmNhbnZhcy5jLndpZHRoLCBzZXR1cF8xLmdhbWUuY2FudmFzLmMuaGVpZ2h0KTtcbiAgICBzZXR1cF8xLmdhbWUuZHJhdygpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShtYWluKTtcbn1cbm1haW4oKTtcbi8vIGV4cG9ydCBjb25zdCBkZXZCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rldi1idXR0b25cIikhO1xuLy8gZGV2QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4vLyAgIGdhbWUucHJpbnRQaWVjZXNPbkJvYXJkKCk7XG4vLyAgIGNvbnN0IHRhcmdldCA9IENlbGxIZWxwZXIuSW5kZXhUb05hbWUoNCwgNCk7XG4vLyAgIGNvbnNvbGUubG9nKHtcbi8vICAgICB0YXJnZXQsXG4vLyAgICAgcG9zc2libGVNb3ZlczogZ2FtZS5ib2FyZC5wb3NzaWJsZU1vdmVzLFxuLy8gICAgIGJvYXJkOiBnYW1lLmJvYXJkLFxuLy8gICB9KTtcbi8vIH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9