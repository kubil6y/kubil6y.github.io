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

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.devButton = void 0;
const setup_1 = __webpack_require__(/*! ./setup */ "./src/setup.ts");
const CellHelper_1 = __webpack_require__(/*! ./utils/CellHelper */ "./src/utils/CellHelper.ts");
setup_1.game.init();
setup_1.game.draw();
function main() {
    setup_1.game.canvas.ctx.clearRect(0, 0, setup_1.game.canvas.c.width, setup_1.game.canvas.c.height);
    setup_1.game.draw();
    requestAnimationFrame(main);
}
main();
exports.devButton = document.querySelector("#dev-button");
exports.devButton.addEventListener("click", () => {
    setup_1.game.printPiecesOnBoard();
    const target = CellHelper_1.CellHelper.IndexToName(4, 4);
    console.log({
        target,
        possibleMoves: setup_1.game.board.possibleMoves,
        board: setup_1.game.board,
    });
});


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
            var _a, _b, _c, _d;
            const result = [];
            const { i, j } = CellHelper_1.CellHelper.NameToIndex(this.currentPosition);
            // FIXME holy shit make an array and loop over this shit logic
            // from white's perspective
            // going down
            if (CellHelper_1.CellHelper.IsCellValid(i - 1, j)) {
                if (cells[i - 1][j].currentPiece === null) {
                    result.push(cells[i - 1][j]);
                }
                else {
                    if (((_a = cells[i - 1][j].currentPiece) === null || _a === void 0 ? void 0 : _a.color) !== this.color) {
                        result.push(cells[i - 1][j]);
                    }
                }
            }
            // going up
            if (CellHelper_1.CellHelper.IsCellValid(i + 1, j)) {
                if (cells[i + 1][j].currentPiece === null) {
                    result.push(cells[i + 1][j]);
                }
                else {
                    if (((_b = cells[i + 1][j].currentPiece) === null || _b === void 0 ? void 0 : _b.color) !== this.color) {
                        result.push(cells[i + 1][j]);
                    }
                }
            }
            // going left
            if (CellHelper_1.CellHelper.IsCellValid(i, j - 1)) {
                if (cells[i][j - 1].currentPiece === null) {
                    result.push(cells[i][j - 1]);
                }
                else {
                    if (((_c = cells[i][j - 1].currentPiece) === null || _c === void 0 ? void 0 : _c.color) !== this.color) {
                        result.push(cells[i][j - 1]);
                    }
                }
            }
            // going right
            if (CellHelper_1.CellHelper.IsCellValid(i, j + 1)) {
                if (cells[i][j + 1].currentPiece === null) {
                    result.push(cells[i][j + 1]);
                }
                else {
                    if (((_d = cells[i][j + 1].currentPiece) === null || _d === void 0 ? void 0 : _d.color) !== this.color) {
                        result.push(cells[i][j + 1]);
                    }
                }
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdk9hO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1RhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7Ozs7Ozs7Ozs7QUNSRTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9CYXNlQ29tcG9uZW50LnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL0JvYXJkLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL0NhbnZhcy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9DZWxsLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvSW5mb3JtYXRpb25TZXJ2aWNlLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL2V2ZW50cy9DbGlja0V2ZW50cy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9ldmVudHMvRXZlbnRSdW5uZXIudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvZXZlbnRzL1Jlc2l6ZUV2ZW50cy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9tYWluLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9CYXNlUGllY2UudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL0Jpc2hvcC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvS25pZ2h0LnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9QYXduLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9RdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvUm9vay50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tCaXNob3AudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL2JsYWNrL0JsYWNrS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tLbmlnaHQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL2JsYWNrL0JsYWNrUGF3bi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tRdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvYmxhY2svQmxhY2tSb29rLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy9ibGFjay9pbmRleC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVCaXNob3AudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL3doaXRlL1doaXRlS2luZy50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVLbmlnaHQudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvcGllY2VzL3doaXRlL1doaXRlUGF3bi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVRdWVlbi50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9waWVjZXMvd2hpdGUvV2hpdGVSb29rLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3BpZWNlcy93aGl0ZS9pbmRleC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy9zZXR1cC50cyIsIndlYnBhY2s6Ly90eXBpbmdfZ2FtZS8uL3NyYy91dGlscy9DZWxsSGVscGVyLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3V0aWxzL0dsb2JhbHMudHMiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvLi9zcmMvdXRpbHMvUm5kLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lLy4vc3JjL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzLnRzIiwid2VicGFjazovL3R5cGluZ19nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3R5cGluZ19nYW1lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdHlwaW5nX2dhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3R5cGluZ19nYW1lL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQmFzZUNvbXBvbmVudCA9IHZvaWQgMDtcbmNsYXNzIEJhc2VDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhbnZhcywgeCwgeSwgc2l6ZSwgY29sb3IpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICAgICAgdGhpcy5kcmF3UmVjdCA9IChjb2xvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3U3Ryb2tlID0gKGNvbG9yLCB0aGlja25lc3MpID0+IHtcbiAgICAgICAgICAgIGlmIChjb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlja25lc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHgubGluZVdpZHRoID0gdGhpY2tuZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jYW52YXMuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3VGV4dCA9ICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5mb250ID0gYCR7dGhpcy5zaXplfXB4IGFyaWFsYDtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5maWxsVGV4dCh0ZXh0LCB0aGlzLngsIHRoaXMueSk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQmFzZUNvbXBvbmVudCA9IEJhc2VDb21wb25lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQm9hcmQgPSB2b2lkIDA7XG5jb25zdCB3aGl0ZV8xID0gcmVxdWlyZShcIi4vcGllY2VzL3doaXRlXCIpO1xuY29uc3QgYmxhY2tfMSA9IHJlcXVpcmUoXCIuL3BpZWNlcy9ibGFja1wiKTtcbmNvbnN0IENlbGxfMSA9IHJlcXVpcmUoXCIuL0NlbGxcIik7XG5jb25zdCBCbGFja1Bhd25fMSA9IHJlcXVpcmUoXCIuL3BpZWNlcy9ibGFjay9CbGFja1Bhd25cIik7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgR2xvYmFsc18xID0gcmVxdWlyZShcIi4vdXRpbHMvR2xvYmFsc1wiKTtcbmNvbnN0IFJuZF8xID0gcmVxdWlyZShcIi4vdXRpbHMvUm5kXCIpO1xuY2xhc3MgQm9hcmQge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLmNlbGxzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudFBsYXllciA9IFwid2hpdGVcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5hdHRlbXBlZE5leHRTZWxlY3RlZENlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLm5leHRTZWxlY3RlZENlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLm1vdmVzID0gW107XG4gICAgICAgIHRoaXMuY2FwdHVyZWRQaWVjZXMgPSBbXTtcbiAgICAgICAgdGhpcy5sYXN0TW92ZWRQaWVjZUNlbGxQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIHRoaXMucG9zc2libGVNb3ZlcyA9IFtdO1xuICAgICAgICB0aGlzLm1vdmVTb3VuZCA9IG5ldyBBdWRpbyhcIi9zb3VuZC9wdWJsaWNfc291bmRfc3RhbmRhcmRfTW92ZS5tcDNcIik7XG4gICAgICAgIHRoaXMuY2FwdHVyZVNvdW5kID0gbmV3IEF1ZGlvKFwiL3NvdW5kL3B1YmxpY19zb3VuZF9zdGFuZGFyZF9DYXB0dXJlLm1wM1wiKTtcbiAgICAgICAgdGhpcy5jYXB0dXJlZF9waWVjZXNfYnlfd2hpdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcHR1cmVkX3BpZWNlc19ieV93aGl0ZVwiKTtcbiAgICAgICAgdGhpcy5jYXB0dXJlZF9waWVjZXNfYnlfYmxhY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NhcHR1cmVkX3BpZWNlc19ieV9ibGFja1wiKTtcbiAgICAgICAgdGhpcy5pbml0Q2VsbHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gdGhpcy5zdGFydFggKyBqICogdGhpcy5jZWxsU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMuc3RhcnRZICsgaSAqIHRoaXMuY2VsbFNpemU7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gKGkgKyBqKSAlIDIgPT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gR2xvYmFsc18xLkdsb2JhbHMuV0hJVEVfQ0VMTF9DT0xPUlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBHbG9iYWxzXzEuR2xvYmFscy5CTEFDS19DRUxMX0NPTE9SO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuSW5kZXhUb05hbWUoaSwgaik7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKG5ldyBDZWxsXzEuQ2VsbChuYW1lLCB0aGlzLmNhbnZhcywgeCwgeSwgdGhpcy5jZWxsU2l6ZSwgY29sb3IpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKGFycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0SW5pdGlhbFBvc2l0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgd2hpdGUsIGJsYWNrIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXRJbml0aWFsUG9zaXRpb25zKCk7XG4gICAgICAgICAgICAvLyBXaGl0ZSBwaWVjZXNcbiAgICAgICAgICAgIHdoaXRlLnBhd25zLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGBwYXduOiR7Um5kXzEuUm5kLkdlbmVyYXRlSWQoKX1gO1xuICAgICAgICAgICAgICAgIGNlbGwuY3VycmVudFBpZWNlID0gbmV3IHdoaXRlXzEuV2hpdGVQYXduKHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJ3aGl0ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgd2hpdGVLaW5nQ2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24od2hpdGUua2luZyk7XG4gICAgICAgICAgICB3aGl0ZUtpbmdDZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyB3aGl0ZV8xLldoaXRlS2luZyh0aGlzLCB3aGl0ZS5raW5nLCB3aGl0ZS5raW5nLCBcImtpbmdcIiwgdGhpcy5jYW52YXMsIHdoaXRlS2luZ0NlbGwueCwgd2hpdGVLaW5nQ2VsbC55LCB3aGl0ZUtpbmdDZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICBjb25zdCB3aGl0ZVF1ZWVuQ2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24od2hpdGUucXVlZW4pO1xuICAgICAgICAgICAgd2hpdGVRdWVlbkNlbGwuY3VycmVudFBpZWNlID0gbmV3IHdoaXRlXzEuV2hpdGVRdWVlbih0aGlzLCB3aGl0ZS5xdWVlbiwgd2hpdGUucXVlZW4sIFwicXVlZW5cIiwgdGhpcy5jYW52YXMsIHdoaXRlUXVlZW5DZWxsLngsIHdoaXRlUXVlZW5DZWxsLnksIHdoaXRlUXVlZW5DZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICB3aGl0ZS5yb29rcy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgcm9vazoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyB3aGl0ZV8xLldoaXRlUm9vayh0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdoaXRlLmJpc2hvcHMuZm9yRWFjaCgocG9zLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGBiaXNob3A6JHtpbmRleCA9PT0gMCA/IFwiYmxhY2tcIiA6IFwid2hpdGVcIn06JHtSbmRfMS5SbmQuR2VuZXJhdGVJZCgpfWA7XG4gICAgICAgICAgICAgICAgY2VsbC5jdXJyZW50UGllY2UgPSBuZXcgd2hpdGVfMS5XaGl0ZUJpc2hvcCh0aGlzLCBwb3MsIHBvcywgbmFtZSwgdGhpcy5jYW52YXMsIGNlbGwueCwgY2VsbC55LCBjZWxsLnNpemUsIFwid2hpdGVcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdoaXRlLmtuaWdodHMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYGtuaWdodDoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyB3aGl0ZV8xLldoaXRlS25pZ2h0KHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJ3aGl0ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gYmxhY2sgcGllY2VzIC0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG4gICAgICAgICAgICBibGFjay5wYXducy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgcGF3bjoke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyBCbGFja1Bhd25fMS5CbGFja1Bhd24odGhpcywgcG9zLCBwb3MsIG5hbWUsIHRoaXMuY2FudmFzLCBjZWxsLngsIGNlbGwueSwgY2VsbC5zaXplLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBibGFja0tpbmdDZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihibGFjay5raW5nKTtcbiAgICAgICAgICAgIGJsYWNrS2luZ0NlbGwuY3VycmVudFBpZWNlID0gbmV3IGJsYWNrXzEuQmxhY2tLaW5nKHRoaXMsIGJsYWNrLmtpbmcsIGJsYWNrLmtpbmcsIFwia2luZ1wiLCB0aGlzLmNhbnZhcywgYmxhY2tLaW5nQ2VsbC54LCBibGFja0tpbmdDZWxsLnksIGJsYWNrS2luZ0NlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGJsYWNrUXVlZW5DZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihibGFjay5xdWVlbik7XG4gICAgICAgICAgICBibGFja1F1ZWVuQ2VsbC5jdXJyZW50UGllY2UgPSBuZXcgYmxhY2tfMS5CbGFja1F1ZWVuKHRoaXMsIGJsYWNrLnF1ZWVuLCBibGFjay5xdWVlbiwgXCJxdWVlblwiLCB0aGlzLmNhbnZhcywgYmxhY2tRdWVlbkNlbGwueCwgYmxhY2tRdWVlbkNlbGwueSwgYmxhY2tRdWVlbkNlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIGJsYWNrLnJvb2tzLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGxBdFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGByb29rOiR7Um5kXzEuUm5kLkdlbmVyYXRlSWQoKX1gO1xuICAgICAgICAgICAgICAgIGNlbGwuY3VycmVudFBpZWNlID0gbmV3IGJsYWNrXzEuQmxhY2tSb29rKHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYmxhY2suYmlzaG9wcy5mb3JFYWNoKChwb3MsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYGJpc2hvcDoke2luZGV4ID09PSAwID8gXCJ3aGl0ZVwiIDogXCJibGFja1wifToke1JuZF8xLlJuZC5HZW5lcmF0ZUlkKCl9YDtcbiAgICAgICAgICAgICAgICBjZWxsLmN1cnJlbnRQaWVjZSA9IG5ldyBibGFja18xLkJsYWNrQmlzaG9wKHRoaXMsIHBvcywgcG9zLCBuYW1lLCB0aGlzLmNhbnZhcywgY2VsbC54LCBjZWxsLnksIGNlbGwuc2l6ZSwgXCJibGFja1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYmxhY2sua25pZ2h0cy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5nZXRDZWxsQXRQb3NpdGlvbihwb3MpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBga25pZ2h0OiR7Um5kXzEuUm5kLkdlbmVyYXRlSWQoKX1gO1xuICAgICAgICAgICAgICAgIGNlbGwuY3VycmVudFBpZWNlID0gbmV3IGJsYWNrXzEuQmxhY2tLbmlnaHQodGhpcywgcG9zLCBwb3MsIG5hbWUsIHRoaXMuY2FudmFzLCBjZWxsLngsIGNlbGwueSwgY2VsbC5zaXplLCBcImJsYWNrXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdENlbGxzKCk7XG4gICAgICAgICAgICB0aGlzLnNldEluaXRpYWxQb3NpdGlvbnMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kcmF3ID0gKCkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZHJhd2luZyBjZWxsc1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW2pdLmRyYXdSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGRyYXdpbmcgY3VycmVudCBwb3NpdGlvbiBwaWVjZXNcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaSwgaik7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGNlbGwuY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZHJhdygpO1xuICAgICAgICAgICAgICAgICAgICAvLyBkcmF3aW5nIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsXG4gICAgICAgICAgICAgICAgICAgIChfYiA9IHRoaXMuY3VycmVudFNlbGVjdGVkQ2VsbCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmRyYXdTdHJva2UoXCIjYmNjNTM2NmJcIiwgMyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxhc3RNb3ZlZFBpZWNlQ2VsbFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RNb3ZlZFBpZWNlQ2VsbFBvc2l0aW9uLmRyYXdTdHJva2UoXCJkYXJrZ3JlZW5cIiwgMyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFNlbGVjdGVkQ2VsbCAmJiB0aGlzLnBvc3NpYmxlTW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3NzaWJsZU1vdmVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jdXJyZW50UGllY2UgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kcmF3Q2lyY2xlKHRoaXMuY2FudmFzLmN0eCwgNiwgXCJyZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRyYXdDaXJjbGUodGhpcy5jYW52YXMuY3R4LCA2LCBcIiNiY2M1MzY2YlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJlbmRlciBjYXB0dXJlZCBwaWVjZXNcbiAgICAgICAgICAgIHRoaXMuZHJhd0NhcHR1cmVkUGllY2VzKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhd0NhcHR1cmVkUGllY2VzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FwdHVyZWRCeVdoaXRlID0gW107XG4gICAgICAgICAgICBjb25zdCBjYXB0dXJlZEJ5QmxhY2sgPSBbXTtcbiAgICAgICAgICAgIGxldCBjYXB0dXJlZEJ5V2hpdGVTdHJpbmcgPSBcIi1cIjtcbiAgICAgICAgICAgIGxldCBjYXB0dXJlZEJ5QmxhY2tTdHJpbmcgPSBcIi1cIjtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jYXB0dXJlZFBpZWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhcHR1cmVkUGllY2VzW2ldLmNvbG9yID09PSBcIndoaXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZWRCeUJsYWNrLnB1c2godGhpcy5jYXB0dXJlZFBpZWNlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlZEJ5V2hpdGUucHVzaCh0aGlzLmNhcHR1cmVkUGllY2VzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzb3J0IGNhcHR1cmVkIGFycmF5c1xuICAgICAgICAgICAgY2FwdHVyZWRCeVdoaXRlLnNvcnQoKGksIGopID0+IGoucG9pbnRzVmFsdWUgLSBpLnBvaW50c1ZhbHVlKTtcbiAgICAgICAgICAgIGNhcHR1cmVkQnlCbGFjay5zb3J0KChpLCBqKSA9PiBqLnBvaW50c1ZhbHVlIC0gaS5wb2ludHNWYWx1ZSk7XG4gICAgICAgICAgICAvLyB0b3RhbCBwb2ludHNcbiAgICAgICAgICAgIGNvbnN0IHBvaW50c0J5V2hpdGUgPSBjYXB0dXJlZEJ5V2hpdGUucmVkdWNlKChzdW0sIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VtICsgY3Vyci5wb2ludHNWYWx1ZTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgY29uc3QgcG9pbnRzQnlCbGFjayA9IGNhcHR1cmVkQnlCbGFjay5yZWR1Y2UoKHN1bSwgY3VycikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdW0gKyBjdXJyLnBvaW50c1ZhbHVlO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBpZiAoY2FwdHVyZWRCeVdoaXRlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gYDxzcGFuIGNsYXNzPVwidGV4dC1zbVwiPiBbJHtwb2ludHNCeVdoaXRlfV08L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBjYXB0dXJlZEJ5V2hpdGVTdHJpbmcgPVxuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlZEJ5V2hpdGUubWFwKChpdGVtKSA9PiBpdGVtLnVuaWNvZGUpLmpvaW4oXCIgXCIpICsgc3BhbjtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmVkX3BpZWNlc19ieV93aGl0ZS5pbm5lckhUTUwgPSBjYXB0dXJlZEJ5V2hpdGVTdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FwdHVyZWRCeUJsYWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gYDxzcGFuIGNsYXNzPVwidGV4dC1zbVwiPiBbJHtwb2ludHNCeUJsYWNrfV08L3NwYW4+YDtcbiAgICAgICAgICAgICAgICBjYXB0dXJlZEJ5QmxhY2tTdHJpbmcgPVxuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlZEJ5QmxhY2subWFwKChpdGVtKSA9PiBpdGVtLnVuaWNvZGUpLmpvaW4oXCIgXCIpICsgc3BhbjtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcHR1cmVkX3BpZWNlc19ieV9ibGFjay5pbm5lckhUTUwgPSBjYXB0dXJlZEJ5QmxhY2tTdHJpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q2VsbEJ5Q29vcmRpbmF0ZXMgPSAoeCwgeSkgPT4ge1xuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGNlbGxzIGFuZCBjaGVjayBmb3Igd2hhdGV2ZXJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0SW5kZXgoaSwgaik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh4ID4gY2VsbC54ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICB4IDwgY2VsbC54ICsgdGhpcy5jZWxsU2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA+IGNlbGwueSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA8IGNlbGwueSArIHRoaXMuY2VsbFNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjZWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENlbGxBdFBvc2l0aW9uID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHBvc2l0aW9uKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENlbGxBdEluZGV4KGksIGopO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENlbGxBdEluZGV4ID0gKGksIGopID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNlbGxzW2ldW2pdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldFBpZWNlQXRQb3NpdGlvbiA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbEF0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICAgICAgaWYgKCFjZWxsLmN1cnJlbnRQaWVjZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBjZWxsLmN1cnJlbnRQaWVjZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRQb3NzaWJsZU1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBvc3NpYmxlTW92ZXMgPSBjZWxscztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5saXN0ZW5Gb3JNb3ZlcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBwbGF5Q2FwdHVyZVNvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50U2VsZWN0ZWRDZWxsICYmIHRoaXMubmV4dFNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8vIGNhcHR1cmluZyBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0U2VsZWN0ZWRDZWxsLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5Q2FwdHVyZVNvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlZFBpZWNlcy5wdXNoKHRoaXMubmV4dFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBzZXR0aW5nIG5leHQgY2VsbCdzIG5ldyBwaWVjZVxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UuaGFzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UgPVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlO1xuICAgICAgICAgICAgICAgIC8vIHNldHRpbmcgbmV4dCBjZWxsJ3MgcGllY2UncyBwb3NpdGlvblxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UuY3VycmVudFBvc2l0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0U2VsZWN0ZWRDZWxsLm5hbWU7XG4gICAgICAgICAgICAgICAgLy8gc2V0dGluZyBsYXN0TW92ZWRQaWVjZUNlbGxQb3NpdGlvblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdE1vdmVkUGllY2VDZWxsUG9zaXRpb24gPSB0aGlzLm5leHRTZWxlY3RlZENlbGw7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZpbmcgY3VycmVudCBjZWxsJ3MgcGllY2VcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwuY3VycmVudFBpZWNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIGFmdGVyIG1vdmVcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3RlZENlbGwgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW1wZWROZXh0U2VsZWN0ZWRDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRTZWxlY3RlZENlbGwgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5Q2FwdHVyZVNvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdHVyZVNvdW5kLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNvdW5kLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyID09PSBcIndoaXRlXCIgPyBcImJsYWNrXCIgOiBcIndoaXRlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLmNhcHR1cmVTb3VuZC5wcmVsb2FkID0gXCJhdXRvXCI7XG4gICAgICAgIHRoaXMuY2FwdHVyZVNvdW5kLmxvYWQoKTtcbiAgICAgICAgdGhpcy5tb3ZlU291bmQucHJlbG9hZCA9IFwiYXV0b1wiO1xuICAgICAgICB0aGlzLm1vdmVTb3VuZC5sb2FkKCk7XG4gICAgfVxuICAgIC8vIGxlbmd0aCAlIDggbXVzdCBiZSAwXG4gICAgZ2V0IGxlbmd0aCgpIHtcbiAgICAgICAgY29uc3QgbCA9IE1hdGgubWluKHRoaXMuY2FudmFzLmMud2lkdGgsIHRoaXMuY2FudmFzLmMuaGVpZ2h0KSAqXG4gICAgICAgICAgICBHbG9iYWxzXzEuR2xvYmFscy5CT0FSRF9UT19XSU5ET1dfUkFUSU87XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IGwgJSA4O1xuICAgICAgICByZXR1cm4gbCAtIHJlbWFpbmluZztcbiAgICB9XG4gICAgZ2V0IHN0YXJ0WCgpIHtcbiAgICAgICAgcmV0dXJuICh3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMubGVuZ3RoKSAvIDI7XG4gICAgfVxuICAgIGdldCBzdGFydFkoKSB7XG4gICAgICAgIHJldHVybiAod2luZG93LmlubmVySGVpZ2h0IC0gdGhpcy5sZW5ndGgpIC8gMjtcbiAgICB9XG4gICAgZ2V0IGNlbGxTaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGggLyA4O1xuICAgIH1cbn1cbmV4cG9ydHMuQm9hcmQgPSBCb2FyZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DYW52YXMgPSB2b2lkIDA7XG5jbGFzcyBDYW52YXMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuYy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLmMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2FudmFzID0gQ2FudmFzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkNlbGwgPSB2b2lkIDA7XG5jb25zdCBCYXNlQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9CYXNlQ29tcG9uZW50XCIpO1xuY2xhc3MgQ2VsbCBleHRlbmRzIEJhc2VDb21wb25lbnRfMS5CYXNlQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYW52YXMsIHgsIHksIHNpemUsIGNvbG9yKSB7XG4gICAgICAgIHN1cGVyKG5hbWUsIGNhbnZhcywgeCwgeSwgc2l6ZSwgY29sb3IpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgICAgICB0aGlzLmN1cnJlbnRQaWVjZSA9IG51bGw7XG4gICAgICAgIHRoaXMuZHJhd0NpcmNsZSA9IChjdHgsIHJhZGl1cywgY29sb3IpID0+IHtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5jZW50ZXI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgICAgICAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IGNlbnRlcigpIHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMueCArIHRoaXMuc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnkgKyB0aGlzLnNpemUgLyAyO1xuICAgICAgICByZXR1cm4geyB4LCB5IH07XG4gICAgfVxuICAgIHNldEN1cnJlbnRQaWVjZShwaWVjZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRQaWVjZSA9IHBpZWNlO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2VsbCA9IENlbGw7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuR2FtZSA9IHZvaWQgMDtcbmNvbnN0IEJvYXJkXzEgPSByZXF1aXJlKFwiLi9Cb2FyZFwiKTtcbmNvbnN0IEV2ZW50UnVubmVyXzEgPSByZXF1aXJlKFwiLi9ldmVudHMvRXZlbnRSdW5uZXJcIik7XG5jb25zdCBJbmZvcm1hdGlvblNlcnZpY2VfMSA9IHJlcXVpcmUoXCIuL0luZm9ybWF0aW9uU2VydmljZVwiKTtcbmNsYXNzIEdhbWUge1xuICAgIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICAgICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZF8xLkJvYXJkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5fZXZlbnRSdW5uZXIgPSBuZXcgRXZlbnRSdW5uZXJfMS5FdmVudFJ1bm5lcih0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5faW5mb3JtYXRpb25TZXJ2aWNlID0gbmV3IEluZm9ybWF0aW9uU2VydmljZV8xLkluZm9ybWF0aW9uU2VydmljZSh0aGlzKTtcbiAgICAgICAgdGhpcy5pbml0ID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5pbml0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZHJhdyA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuZHJhdygpO1xuICAgICAgICAgICAgdGhpcy5faW5mb3JtYXRpb25TZXJ2aWNlLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5ib2FyZC5saXN0ZW5Gb3JNb3ZlcygpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBUT0RPIG9ubHkgZm9yIGRldlxuICAgICAgICB0aGlzLnByaW50UGllY2VzT25Cb2FyZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuYm9hcmQuY2VsbHNbaV1bal0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpZWNlOiB0aGlzLmJvYXJkLmNlbGxzW2ldW2pdLmN1cnJlbnRQaWVjZSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGFycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuR2FtZSA9IEdhbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW5mb3JtYXRpb25TZXJ2aWNlID0gdm9pZCAwO1xuY2xhc3MgSW5mb3JtYXRpb25TZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMucm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCI6cm9vdFwiKTtcbiAgICAgICAgdGhpcy51cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWN1cnJlbnQtcGxheWVyXCIsIHRoaXMuZ2FtZS5ib2FyZC5jdXJyZW50UGxheWVyKTtcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkluZm9ybWF0aW9uU2VydmljZSA9IEluZm9ybWF0aW9uU2VydmljZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5DbGlja0V2ZW50cyA9IHZvaWQgMDtcbmNsYXNzIENsaWNrRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGluZ0NlbGxzID0gKGNlbGwpID0+IHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICBpZiAoY2VsbC5jdXJyZW50UGllY2UgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmN1cnJlbnRQbGF5ZXIgPT09IGNlbGwuY3VycmVudFBpZWNlLmNvbG9yICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuYm9hcmQuYXR0ZW1wZWROZXh0U2VsZWN0ZWRDZWxsICYmXG4gICAgICAgICAgICAgICAgIXRoaXMuYm9hcmQubmV4dFNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8vIFNlbGVjdGluZyBjdXJyZW50U2VsZWN0ZWRDZWxsXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZC5jdXJyZW50U2VsZWN0ZWRDZWxsID0gY2VsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3NzaWJsZU1vdmVzID0gKChfYSA9IHRoaXMuYm9hcmQuY3VycmVudFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5nZXRWYWxpZE1vdmVzKHRoaXMuYm9hcmQuY2VsbHMpKSB8fCBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLnNldFBvc3NpYmxlTW92ZXMocG9zc2libGVNb3Zlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmJvYXJkLmN1cnJlbnRTZWxlY3RlZENlbGwgJiYgIXRoaXMuYm9hcmQubmV4dFNlbGVjdGVkQ2VsbCkge1xuICAgICAgICAgICAgICAgIC8vIFNlbGVjdGluZyBhdHRlbXBlZE5leHRTZWxlY3RlZENlbGxcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLmF0dGVtcGVkTmV4dFNlbGVjdGVkQ2VsbCA9IGNlbGw7XG4gICAgICAgICAgICAgICAgaWYgKChfYiA9IHRoaXMuYm9hcmQuY3VycmVudFNlbGVjdGVkQ2VsbC5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5pc1ZhbGlkTW92ZSh0aGlzLmJvYXJkLmNlbGxzLCBjZWxsKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZWxlY3RpbmcgbmV4dFNlbGVjdGVkQ2VsbFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLm5leHRTZWxlY3RlZENlbGwgPSBjZWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkLnNldFBvc3NpYmxlTW92ZXMoW10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZ2V0Q2VsbEJ5Q29vcmRpbmF0ZXMoZXZlbnQueCwgZXZlbnQueSk7XG4gICAgICAgICAgICBpZiAoY2VsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW5nQ2VsbHMoY2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuQ2xpY2tFdmVudHMgPSBDbGlja0V2ZW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5FdmVudFJ1bm5lciA9IHZvaWQgMDtcbmNvbnN0IENsaWNrRXZlbnRzXzEgPSByZXF1aXJlKFwiLi9DbGlja0V2ZW50c1wiKTtcbmNvbnN0IFJlc2l6ZUV2ZW50c18xID0gcmVxdWlyZShcIi4vUmVzaXplRXZlbnRzXCIpO1xuY2xhc3MgRXZlbnRSdW5uZXIge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy5fcmVzaXplRXZlbnRzID0gbmV3IFJlc2l6ZUV2ZW50c18xLlJlc2l6ZUV2ZW50cyh0aGlzLmJvYXJkKTtcbiAgICAgICAgdGhpcy5fY2xpY2tFdmVudHMgPSBuZXcgQ2xpY2tFdmVudHNfMS5DbGlja0V2ZW50cyh0aGlzLmJvYXJkKTtcbiAgICB9XG59XG5leHBvcnRzLkV2ZW50UnVubmVyID0gRXZlbnRSdW5uZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVzaXplRXZlbnRzID0gdm9pZCAwO1xuY2xhc3MgUmVzaXplRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3Rvcihib2FyZCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gYm9hcmQ7XG4gICAgICAgIC8vIEZJWE1FIHJlc2l6ZSBjZWxscyBhbmQgcGllY2UgcG9zaXRpb25zXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuY2FudmFzLmMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuYm9hcmQuY2FudmFzLmMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlJlc2l6ZUV2ZW50cyA9IFJlc2l6ZUV2ZW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZXZCdXR0b24gPSB2b2lkIDA7XG5jb25zdCBzZXR1cF8xID0gcmVxdWlyZShcIi4vc2V0dXBcIik7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi91dGlscy9DZWxsSGVscGVyXCIpO1xuc2V0dXBfMS5nYW1lLmluaXQoKTtcbnNldHVwXzEuZ2FtZS5kcmF3KCk7XG5mdW5jdGlvbiBtYWluKCkge1xuICAgIHNldHVwXzEuZ2FtZS5jYW52YXMuY3R4LmNsZWFyUmVjdCgwLCAwLCBzZXR1cF8xLmdhbWUuY2FudmFzLmMud2lkdGgsIHNldHVwXzEuZ2FtZS5jYW52YXMuYy5oZWlnaHQpO1xuICAgIHNldHVwXzEuZ2FtZS5kcmF3KCk7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufVxubWFpbigpO1xuZXhwb3J0cy5kZXZCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rldi1idXR0b25cIik7XG5leHBvcnRzLmRldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHNldHVwXzEuZ2FtZS5wcmludFBpZWNlc09uQm9hcmQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5JbmRleFRvTmFtZSg0LCA0KTtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgcG9zc2libGVNb3Zlczogc2V0dXBfMS5nYW1lLmJvYXJkLnBvc3NpYmxlTW92ZXMsXG4gICAgICAgIGJvYXJkOiBzZXR1cF8xLmdhbWUuYm9hcmQsXG4gICAgfSk7XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CYXNlUGllY2UgPSB2b2lkIDA7XG5jb25zdCBCYXNlQ29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi4vQmFzZUNvbXBvbmVudFwiKTtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY2xhc3MgQmFzZVBpZWNlIGV4dGVuZHMgQmFzZUNvbXBvbmVudF8xLkJhc2VDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGJvYXJkLCBpbml0aWFsUG9zaXRpb24sIGN1cnJlbnRQb3NpdGlvbiwgbmFtZSwgY2FudmFzLCB4LCB5LCBzaXplLCBjb2xvcikge1xuICAgICAgICBzdXBlcihuYW1lLCBjYW52YXMsIHgsIHksIHNpemUsIGNvbG9yKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IGluaXRpYWxQb3NpdGlvbjtcbiAgICAgICAgdGhpcy5jdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgICAgIHRoaXMuaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwaWVjZXNcIik7XG4gICAgICAgIHRoaXMuaGFzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgLy8gVE9ETyBwaW5uZWQgcGllY2VzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBpc1ZhbGlkTW92ZVxuICAgICAgICB0aGlzLmlzUGlubmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhd1VuaWNvZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5mb250ID0gYCR7dGhpcy5zaXplfXB4IGFyaWFsYDtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5maWxsVGV4dCh0aGlzLnVuaWNvZGUsIHRoaXMueCwgdGhpcy55KTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGRyYXcoKSB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0Q2VsbENlbnRlckJ5TmFtZSh0aGlzLmJvYXJkLmNlbGxzLCB0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgIGNvbnN0IHNXaWR0aCA9IHRoaXMuaW1nLm5hdHVyYWxXaWR0aCAvIDY7XG4gICAgICAgIGNvbnN0IHNIZWlnaHQgPSB0aGlzLmltZy5uYXR1cmFsSGVpZ2h0IC8gMjtcbiAgICAgICAgY29uc3QgeyBpbWdXLCBpbWdILCBpbWdPZmZzZXRYLCBpbWdPZmZzZXRZIH0gPSB0aGlzLmdldEltYWdlQ29vcmRpbmF0ZXMoKTtcbiAgICAgICAgY29uc3Qgc3ggPSBzV2lkdGggKiBpbWdXO1xuICAgICAgICBjb25zdCBzeSA9IHNIZWlnaHQgKiBpbWdIO1xuICAgICAgICBjb25zdCBvZmZzZXRYID0gc1dpZHRoIC8gaW1nT2Zmc2V0WDtcbiAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IHNIZWlnaHQgLyBpbWdPZmZzZXRZO1xuICAgICAgICBjb25zdCBkeCA9IHggLSBvZmZzZXRYO1xuICAgICAgICBjb25zdCBkeSA9IHkgLSBvZmZzZXRZO1xuICAgICAgICBjb25zdCBkV2lkdGggPSA1MDtcbiAgICAgICAgY29uc3QgZEhlaWdodCA9IDUwO1xuICAgICAgICB0aGlzLmNhbnZhcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgZHgsIGR5LCBkV2lkdGgsIGRIZWlnaHQpO1xuICAgIH1cbn1cbmV4cG9ydHMuQmFzZVBpZWNlID0gQmFzZVBpZWNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJpc2hvcCA9IHZvaWQgMDtcbmNvbnN0IEJhc2VQaWVjZV8xID0gcmVxdWlyZShcIi4vQmFzZVBpZWNlXCIpO1xuY2xhc3MgQmlzaG9wIGV4dGVuZHMgQmFzZVBpZWNlXzEuQmFzZVBpZWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wb2ludHNWYWx1ZSA9IDM7XG4gICAgfVxufVxuZXhwb3J0cy5CaXNob3AgPSBCaXNob3A7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuS2luZyA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgQmFzZVBpZWNlXzEgPSByZXF1aXJlKFwiLi9CYXNlUGllY2VcIik7XG5jbGFzcyBLaW5nIGV4dGVuZHMgQmFzZVBpZWNlXzEuQmFzZVBpZWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wb2ludHNWYWx1ZSA9IDk5OTtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgLy8gRklYTUUgaG9seSBzaGl0IG1ha2UgYW4gYXJyYXkgYW5kIGxvb3Agb3ZlciB0aGlzIHNoaXQgbG9naWNcbiAgICAgICAgICAgIC8vIGZyb20gd2hpdGUncyBwZXJzcGVjdGl2ZVxuICAgICAgICAgICAgLy8gZ29pbmcgZG93blxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgLSAxLCBqKSkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tpIC0gMV1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAxXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKChfYSA9IGNlbGxzW2kgLSAxXVtqXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAxXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBnb2luZyB1cFxuICAgICAgICAgICAgaWYgKENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLklzQ2VsbFZhbGlkKGkgKyAxLCBqKSkge1xuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tpICsgMV1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKChfYiA9IGNlbGxzW2kgKyAxXVtqXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBnb2luZyBsZWZ0XG4gICAgICAgICAgICBpZiAoQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuSXNDZWxsVmFsaWQoaSwgaiAtIDEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxzW2ldW2ogLSAxXS5jdXJyZW50UGllY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1baiAtIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKF9jID0gY2VsbHNbaV1baiAtIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1baiAtIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGdvaW5nIHJpZ2h0XG4gICAgICAgICAgICBpZiAoQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuSXNDZWxsVmFsaWQoaSwgaiArIDEpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGxzW2ldW2ogKyAxXS5jdXJyZW50UGllY2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1baiArIDFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoKF9kID0gY2VsbHNbaV1baiArIDFdLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNvbG9yKSAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1baiArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG59XG5leHBvcnRzLktpbmcgPSBLaW5nO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLktuaWdodCA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgQmFzZVBpZWNlXzEgPSByZXF1aXJlKFwiLi9CYXNlUGllY2VcIik7XG5jbGFzcyBLbmlnaHQgZXh0ZW5kcyBCYXNlUGllY2VfMS5CYXNlUGllY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnBvaW50c1ZhbHVlID0gMztcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0TE1vdmVtZW50Q2VsbHNGcm9tSW5kZXgoY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVzLmZpbHRlcigoY2VsbCkgPT4geyB2YXIgX2E7IHJldHVybiAoKF9hID0gY2VsbC5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2xvcikgIT09IHRoaXMuY29sb3I7IH0pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxufVxuZXhwb3J0cy5LbmlnaHQgPSBLbmlnaHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUGF3biA9IHZvaWQgMDtcbmNvbnN0IEJhc2VQaWVjZV8xID0gcmVxdWlyZShcIi4vQmFzZVBpZWNlXCIpO1xuY2xhc3MgUGF3biBleHRlbmRzIEJhc2VQaWVjZV8xLkJhc2VQaWVjZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMucG9pbnRzVmFsdWUgPSAxO1xuICAgIH1cbn1cbmV4cG9ydHMuUGF3biA9IFBhd247XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUXVlZW4gPSB2b2lkIDA7XG5jb25zdCBCYXNlUGllY2VfMSA9IHJlcXVpcmUoXCIuL0Jhc2VQaWVjZVwiKTtcbmNsYXNzIFF1ZWVuIGV4dGVuZHMgQmFzZVBpZWNlXzEuQmFzZVBpZWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5wb2ludHNWYWx1ZSA9IDk7XG4gICAgfVxufVxuZXhwb3J0cy5RdWVlbiA9IFF1ZWVuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJvb2sgPSB2b2lkIDA7XG5jb25zdCBCYXNlUGllY2VfMSA9IHJlcXVpcmUoXCIuL0Jhc2VQaWVjZVwiKTtcbmNsYXNzIFJvb2sgZXh0ZW5kcyBCYXNlUGllY2VfMS5CYXNlUGllY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnBvaW50c1ZhbHVlID0gNTtcbiAgICB9XG59XG5leHBvcnRzLlJvb2sgPSBSb29rO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrQmlzaG9wID0gdm9pZCAwO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL0NlbGxIZWxwZXJcIik7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgQmlzaG9wXzEgPSByZXF1aXJlKFwiLi4vQmlzaG9wXCIpO1xuY2xhc3MgQmxhY2tCaXNob3AgZXh0ZW5kcyBCaXNob3BfMS5CaXNob3Age1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLkJsYWNrLkJpc2hvcDtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVzID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuR2V0NDVEZWdyZWVDZWxsc0lmRW1wdHlGcm9tSW5kZXgoXCJibGFja1wiLCBjZWxscywgaSwgaik7XG4gICAgICAgICAgICByZXR1cm4gbW92ZXM7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDIsXG4gICAgICAgICAgICBpbWdIOiAxLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTEuNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDEyLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQmxhY2tCaXNob3AgPSBCbGFja0Jpc2hvcDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CbGFja0tpbmcgPSB2b2lkIDA7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgS2luZ18xID0gcmVxdWlyZShcIi4uL0tpbmdcIik7XG5jbGFzcyBCbGFja0tpbmcgZXh0ZW5kcyBLaW5nXzEuS2luZyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuQmxhY2suS2luZztcbiAgICB9XG4gICAgLy8gcHVibGljIGlzVmFsaWRNb3ZlKGNlbGxzOiBDZWxsW11bXSwgbmV4dENlbGw6IENlbGwpOiBib29sZWFuIHtcbiAgICAvLyAgIHJldHVybiB0cnVlO1xuICAgIC8vIH1cbiAgICAvLyBwdWJsaWMgZ2V0VmFsaWRNb3ZlcyA9IChjZWxsczogQ2VsbFtdW10pOiBDZWxsW10gPT4ge1xuICAgIC8vICAgcmV0dXJuIFtdO1xuICAgIC8vIH07XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDAsXG4gICAgICAgICAgICBpbWdIOiAxLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkJsYWNrS2luZyA9IEJsYWNrS2luZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CbGFja0tuaWdodCA9IHZvaWQgMDtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBLbmlnaHRfMSA9IHJlcXVpcmUoXCIuLi9LbmlnaHRcIik7XG5jbGFzcyBCbGFja0tuaWdodCBleHRlbmRzIEtuaWdodF8xLktuaWdodCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudW5pY29kZSA9IFVuaWNvZGVDaGFyYWN0ZXJzXzEuVW5pY29kZUNoYXJhY3RlcnMuQmxhY2suS25pZ2h0O1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogMyxcbiAgICAgICAgICAgIGltZ0g6IDEsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiAxMC41LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTIsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5CbGFja0tuaWdodCA9IEJsYWNrS25pZ2h0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrUGF3biA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IFBhd25fMSA9IHJlcXVpcmUoXCIuLi9QYXduXCIpO1xuY2xhc3MgQmxhY2tQYXduIGV4dGVuZHMgUGF3bl8xLlBhd24ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLkJsYWNrLlBhd247XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbHNbaSArIDJdW2pdLmN1cnJlbnRQaWVjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMl1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpICsgMSwgaikgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpICsgMV1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSArIDFdW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpICsgMSwgaiAtIDEpICYmXG4gICAgICAgICAgICAgICAgY2VsbHNbaSArIDFdW2ogLSAxXS5jdXJyZW50UGllY2UgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAoKF9hID0gY2VsbHNbaSArIDFdW2ogLSAxXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMV1baiAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpICsgMSwgaiArIDEpICYmXG4gICAgICAgICAgICAgICAgY2VsbHNbaSArIDFdW2ogKyAxXS5jdXJyZW50UGllY2UgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAoKF9iID0gY2VsbHNbaSArIDFdW2ogKyAxXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMV1baiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlzVmFsaWRNb3ZlKGNlbGxzLCBuZXh0Q2VsbCkge1xuICAgICAgICBpZiAodGhpcy5pc1Bpbm5lZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgIHJldHVybiB2YWxpZE1vdmVzLmluY2x1ZGVzKG5leHRDZWxsKTtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDUsXG4gICAgICAgICAgICBpbWdIOiAxLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogOSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDExLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuQmxhY2tQYXduID0gQmxhY2tQYXduO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJsYWNrUXVlZW4gPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBRdWVlbl8xID0gcmVxdWlyZShcIi4uL1F1ZWVuXCIpO1xuY2xhc3MgQmxhY2tRdWVlbiBleHRlbmRzIFF1ZWVuXzEuUXVlZW4ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLkJsYWNrLlF1ZWVuO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXM0NSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDQ1RGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwiYmxhY2tcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gWy4uLm1vdmVzNDVdO1xuICAgICAgICAgICAgY29uc3QgbW92ZXM5MCA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDkwRGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwiYmxhY2tcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgbW92ZXM5MC5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuaW5jbHVkZXMoY2VsbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiAxLFxuICAgICAgICAgICAgaW1nSDogMSxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDE0LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTIsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5CbGFja1F1ZWVuID0gQmxhY2tRdWVlbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CbGFja1Jvb2sgPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBSb29rXzEgPSByZXF1aXJlKFwiLi4vUm9va1wiKTtcbmNsYXNzIEJsYWNrUm9vayBleHRlbmRzIFJvb2tfMS5Sb29rIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5CbGFjay5Sb29rO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXMgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXQ5MERlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleChcImJsYWNrXCIsIGNlbGxzLCBpLCBqKTtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogNCxcbiAgICAgICAgICAgIGltZ0g6IDEsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiA5LjUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMixcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkJsYWNrUm9vayA9IEJsYWNrUm9vaztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tCaXNob3BcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL0JsYWNrS2luZ1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tLbmlnaHRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL0JsYWNrUGF3blwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tRdWVlblwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vQmxhY2tSb29rXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZUJpc2hvcCA9IHZvaWQgMDtcbmNvbnN0IENlbGxIZWxwZXJfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9DZWxsSGVscGVyXCIpO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IEJpc2hvcF8xID0gcmVxdWlyZShcIi4uL0Jpc2hvcFwiKTtcbmNsYXNzIFdoaXRlQmlzaG9wIGV4dGVuZHMgQmlzaG9wXzEuQmlzaG9wIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5XaGl0ZS5CaXNob3A7XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpLCBqIH0gPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5OYW1lVG9JbmRleCh0aGlzLmN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICBjb25zdCBtb3ZlcyA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLkdldDQ1RGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4KFwid2hpdGVcIiwgY2VsbHMsIGksIGopO1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVzO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpc1ZhbGlkTW92ZShjZWxscywgbmV4dENlbGwpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IHZhbGlkTW92ZXMgPSB0aGlzLmdldFZhbGlkTW92ZXMoY2VsbHMpO1xuICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiAyLFxuICAgICAgICAgICAgaW1nSDogMCxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDExLjUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxNCxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldoaXRlQmlzaG9wID0gV2hpdGVCaXNob3A7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2hpdGVLaW5nID0gdm9pZCAwO1xuY29uc3QgVW5pY29kZUNoYXJhY3RlcnNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9Vbmljb2RlQ2hhcmFjdGVyc1wiKTtcbmNvbnN0IEtpbmdfMSA9IHJlcXVpcmUoXCIuLi9LaW5nXCIpO1xuY2xhc3MgV2hpdGVLaW5nIGV4dGVuZHMgS2luZ18xLktpbmcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLktpbmc7XG4gICAgfVxuICAgIC8vIHB1YmxpYyBpc1ZhbGlkTW92ZShjZWxsczogQ2VsbFtdW10sIG5leHRDZWxsOiBDZWxsKTogYm9vbGVhbiB7XG4gICAgLy8gICByZXR1cm4gdHJ1ZTtcbiAgICAvLyB9XG4gICAgLy8gcHVibGljIGdldFZhbGlkTW92ZXMgPSAoY2VsbHM6IENlbGxbXVtdKTogQ2VsbFtdID0+IHtcbiAgICAvLyAgIHJldHVybiBbXTtcbiAgICAvLyB9O1xuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiAwLFxuICAgICAgICAgICAgaW1nSDogMCxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDE1LFxuICAgICAgICAgICAgaW1nT2Zmc2V0WTogMTMsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5XaGl0ZUtpbmcgPSBXaGl0ZUtpbmc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2hpdGVLbmlnaHQgPSB2b2lkIDA7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgS25pZ2h0XzEgPSByZXF1aXJlKFwiLi4vS25pZ2h0XCIpO1xuY2xhc3MgV2hpdGVLbmlnaHQgZXh0ZW5kcyBLbmlnaHRfMS5LbmlnaHQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLnVuaWNvZGUgPSBVbmljb2RlQ2hhcmFjdGVyc18xLlVuaWNvZGVDaGFyYWN0ZXJzLldoaXRlLktuaWdodDtcbiAgICB9XG4gICAgZ2V0SW1hZ2VDb29yZGluYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGltZ1c6IDMsXG4gICAgICAgICAgICBpbWdIOiAwLFxuICAgICAgICAgICAgaW1nT2Zmc2V0WDogMTAuNSxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDEzLFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydHMuV2hpdGVLbmlnaHQgPSBXaGl0ZUtuaWdodDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZVBhd24gPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBQYXduXzEgPSByZXF1aXJlKFwiLi4vUGF3blwiKTtcbmNsYXNzIFdoaXRlUGF3biBleHRlbmRzIFBhd25fMS5QYXduIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5XaGl0ZS5QYXduO1xuICAgICAgICB0aGlzLmlzVmFsaWRNb3ZlID0gKGNlbGxzLCBuZXh0Q2VsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNQaW5uZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgdmFsaWRNb3ZlcyA9IHRoaXMuZ2V0VmFsaWRNb3ZlcyhjZWxscyk7XG4gICAgICAgICAgICByZXR1cm4gdmFsaWRNb3Zlcy5pbmNsdWRlcyhuZXh0Q2VsbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0VmFsaWRNb3ZlcyA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2VsbHNbaSAtIDJdW2pdLmN1cnJlbnRQaWVjZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMl1bal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpIC0gMSwgaikgJiZcbiAgICAgICAgICAgICAgICBjZWxsc1tpIC0gMV1bal0uY3VycmVudFBpZWNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSAtIDFdW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpIC0gMSwgaiAtIDEpICYmXG4gICAgICAgICAgICAgICAgY2VsbHNbaSAtIDFdW2ogLSAxXS5jdXJyZW50UGllY2UgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAoKF9hID0gY2VsbHNbaSAtIDFdW2ogLSAxXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMV1baiAtIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZChpIC0gMSwgaiArIDEpICYmXG4gICAgICAgICAgICAgICAgY2VsbHNbaSAtIDFdW2ogKyAxXS5jdXJyZW50UGllY2UgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICAoKF9iID0gY2VsbHNbaSAtIDFdW2ogKyAxXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMV1baiArIDFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldEltYWdlQ29vcmRpbmF0ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbWdXOiA1LFxuICAgICAgICAgICAgaW1nSDogMCxcbiAgICAgICAgICAgIGltZ09mZnNldFg6IDksXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldoaXRlUGF3biA9IFdoaXRlUGF3bjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZVF1ZWVuID0gdm9pZCAwO1xuY29uc3QgQ2VsbEhlbHBlcl8xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL0NlbGxIZWxwZXJcIik7XG5jb25zdCBVbmljb2RlQ2hhcmFjdGVyc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWxzL1VuaWNvZGVDaGFyYWN0ZXJzXCIpO1xuY29uc3QgUXVlZW5fMSA9IHJlcXVpcmUoXCIuLi9RdWVlblwiKTtcbmNsYXNzIFdoaXRlUXVlZW4gZXh0ZW5kcyBRdWVlbl8xLlF1ZWVuIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5XaGl0ZS5RdWVlbjtcbiAgICAgICAgdGhpcy5nZXRWYWxpZE1vdmVzID0gKGNlbGxzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGksIGogfSA9IENlbGxIZWxwZXJfMS5DZWxsSGVscGVyLk5hbWVUb0luZGV4KHRoaXMuY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVzNDUgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXQ0NURlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleChcIndoaXRlXCIsIGNlbGxzLCBpLCBqKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IFsuLi5tb3ZlczQ1XTtcbiAgICAgICAgICAgIGNvbnN0IG1vdmVzOTAgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXQ5MERlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleChcIndoaXRlXCIsIGNlbGxzLCBpLCBqKTtcbiAgICAgICAgICAgIG1vdmVzOTAuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmluY2x1ZGVzKGNlbGwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogMSxcbiAgICAgICAgICAgIGltZ0g6IDAsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiAxNCxcbiAgICAgICAgICAgIGltZ09mZnNldFk6IDE0LjUsXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0cy5XaGl0ZVF1ZWVuID0gV2hpdGVRdWVlbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XaGl0ZVJvb2sgPSB2b2lkIDA7XG5jb25zdCBDZWxsSGVscGVyXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvQ2VsbEhlbHBlclwiKTtcbmNvbnN0IFVuaWNvZGVDaGFyYWN0ZXJzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbHMvVW5pY29kZUNoYXJhY3RlcnNcIik7XG5jb25zdCBSb29rXzEgPSByZXF1aXJlKFwiLi4vUm9va1wiKTtcbmNsYXNzIFdoaXRlUm9vayBleHRlbmRzIFJvb2tfMS5Sb29rIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy51bmljb2RlID0gVW5pY29kZUNoYXJhY3RlcnNfMS5Vbmljb2RlQ2hhcmFjdGVycy5XaGl0ZS5Sb29rO1xuICAgICAgICB0aGlzLmdldFZhbGlkTW92ZXMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaSwgaiB9ID0gQ2VsbEhlbHBlcl8xLkNlbGxIZWxwZXIuTmFtZVRvSW5kZXgodGhpcy5jdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbW92ZXMgPSBDZWxsSGVscGVyXzEuQ2VsbEhlbHBlci5HZXQ5MERlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleChcIndoaXRlXCIsIGNlbGxzLCBpLCBqKTtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlcztcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaXNWYWxpZE1vdmUoY2VsbHMsIG5leHRDZWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmlzUGlubmVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCB2YWxpZE1vdmVzID0gdGhpcy5nZXRWYWxpZE1vdmVzKGNlbGxzKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkTW92ZXMuaW5jbHVkZXMobmV4dENlbGwpO1xuICAgIH1cbiAgICBnZXRJbWFnZUNvb3JkaW5hdGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW1nVzogNCxcbiAgICAgICAgICAgIGltZ0g6IDAsXG4gICAgICAgICAgICBpbWdPZmZzZXRYOiA5LjUsXG4gICAgICAgICAgICBpbWdPZmZzZXRZOiAxMyxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLldoaXRlUm9vayA9IFdoaXRlUm9vaztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVCaXNob3BcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1doaXRlS2luZ1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVLbmlnaHRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL1doaXRlUGF3blwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVRdWVlblwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vV2hpdGVSb29rXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nYW1lID0gZXhwb3J0cy5jYW52YXMgPSB2b2lkIDA7XG5jb25zdCBDYW52YXNfMSA9IHJlcXVpcmUoXCIuL0NhbnZhc1wiKTtcbmNvbnN0IEdhbWVfMSA9IHJlcXVpcmUoXCIuL0dhbWVcIik7XG5leHBvcnRzLmNhbnZhcyA9IG5ldyBDYW52YXNfMS5DYW52YXMoKTtcbmV4cG9ydHMuZ2FtZSA9IG5ldyBHYW1lXzEuR2FtZShleHBvcnRzLmNhbnZhcyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfYTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQ2VsbEhlbHBlciA9IHZvaWQgMDtcbmNsYXNzIENlbGxIZWxwZXIge1xuICAgIHN0YXRpYyBJbmRleFRvTmFtZShpLCBqKSB7XG4gICAgICAgIC8vIDAsIDAgLT4gYThcbiAgICAgICAgLy8gMywgMiAtPiBiNVxuICAgICAgICBjb25zdCBudW0gPSA4IC0gaTtcbiAgICAgICAgY29uc3QgbGV0dGVycyA9IFwiYWJjZGVmZ2hcIjtcbiAgICAgICAgY29uc3QgY2hhciA9IGxldHRlcnNbal07XG4gICAgICAgIHJldHVybiBjaGFyICsgbnVtO1xuICAgIH1cbiAgICBzdGF0aWMgTmFtZVRvSW5kZXgobmFtZSkge1xuICAgICAgICBjb25zdCBsZXR0ZXJzID0gXCJhYmNkZWZnaFwiO1xuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAobmFtZS5sZW5ndGggIT09IDIpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDZWxsIG5hbWUgbXVzdCBiZSBsZW5ndGggMlwiKTtcbiAgICAgICAgY29uc3QgbnVtID0gcGFyc2VJbnQobmFtZVsxXSk7XG4gICAgICAgIGlmIChudW0gPiA4IHx8IG51bSA8IDEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOdW1iZXIgbXVzdCBiZSBiZXR3ZWVuIDEtOFwiKTtcbiAgICAgICAgY29uc3QgaiA9IGxldHRlcnMuaW5kZXhPZihuYW1lWzBdKTtcbiAgICAgICAgY29uc3QgaSA9IDggLSBudW07XG4gICAgICAgIGlmIChpID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInZhbGlkIGxldHRlcnMge2EsYixjLGUsZCxmLGcsaH1cIik7XG4gICAgICAgIHJldHVybiB7IGksIGogfTtcbiAgICB9XG4gICAgc3RhdGljIEdldENlbGxDZW50ZXJCeU5hbWUoY2VsbHMsIG5hbWUpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgeyBpLCBqIH0gPSB0aGlzLk5hbWVUb0luZGV4KG5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5HZXRDZWxsQ2VudGVyQnlJbmRleGVzKGNlbGxzLCBpLCBqKTtcbiAgICB9XG4gICAgc3RhdGljIEdldENlbGxDZW50ZXJCeUluZGV4ZXMoY2VsbHMsIGksIGopIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGNlbGxzW2ldW2pdO1xuICAgICAgICByZXR1cm4gY2VsbC5jZW50ZXI7XG4gICAgfVxuICAgIHN0YXRpYyBEcmF3Q2VsbE5hbWVUb0JvYXJkKG5hbWUsIGJvYXJkLCBjdHgpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZm9udFNpemUgPSBib2FyZC5jZWxsU2l6ZSAqIDAuNTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBhcmlhbGA7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5HZXRDZWxsQ2VudGVyQnlOYW1lKGJvYXJkLmNlbGxzLCBuYW1lKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KG5hbWUsIHggLSBmb250U2l6ZSAvIDIsIHkgKyBmb250U2l6ZSAvIDQpO1xuICAgIH1cbiAgICBzdGF0aWMgR2V0SW5pdGlhbFBvc2l0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdoaXRlOiB7XG4gICAgICAgICAgICAgICAgcGF3bnM6IFtcImEyXCIsIFwiYjJcIiwgXCJjMlwiLCBcImUyXCIsIFwiZDJcIiwgXCJmMlwiLCBcImcyXCIsIFwiaDJcIl0sXG4gICAgICAgICAgICAgICAgcm9va3M6IFtcImExXCIsIFwiaDFcIl0sXG4gICAgICAgICAgICAgICAga25pZ2h0czogW1wiYjFcIiwgXCJnMVwiXSxcbiAgICAgICAgICAgICAgICBiaXNob3BzOiBbXCJjMVwiLCBcImYxXCJdLFxuICAgICAgICAgICAgICAgIHF1ZWVuOiBcImQxXCIsXG4gICAgICAgICAgICAgICAga2luZzogXCJlMVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJsYWNrOiB7XG4gICAgICAgICAgICAgICAgcGF3bnM6IFtcImE3XCIsIFwiYjdcIiwgXCJjN1wiLCBcImU3XCIsIFwiZDdcIiwgXCJmN1wiLCBcImc3XCIsIFwiaDdcIl0sXG4gICAgICAgICAgICAgICAgcm9va3M6IFtcImE4XCIsIFwiaDhcIl0sXG4gICAgICAgICAgICAgICAga25pZ2h0czogW1wiYjhcIiwgXCJnOFwiXSxcbiAgICAgICAgICAgICAgICBiaXNob3BzOiBbXCJjOFwiLCBcImY4XCJdLFxuICAgICAgICAgICAgICAgIHF1ZWVuOiBcImQ4XCIsXG4gICAgICAgICAgICAgICAga2luZzogXCJlOFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5leHBvcnRzLkNlbGxIZWxwZXIgPSBDZWxsSGVscGVyO1xuX2EgPSBDZWxsSGVscGVyO1xuQ2VsbEhlbHBlci5Jc0NlbGxWYWxpZCA9IChpLCBqKSA9PiB7XG4gICAgcmV0dXJuIGkgPj0gMCAmJiBpIDw9IDcgJiYgaiA+PSAwICYmIGogPD0gNztcbn07XG5DZWxsSGVscGVyLkdldDkwRGVncmVlQ2VsbHNJZkVtcHR5RnJvbUluZGV4ID0gKGZyb21Db2xvclR5cGUsIGNlbGxzLCBpLCBqKSA9PiB7XG4gICAgdmFyIF9iLCBfYywgX2QsIF9lO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIC8vIGdvaW5nIHJpZ2h0XG4gICAgbGV0IHggPSBpICsgMTtcbiAgICB3aGlsZSAoeCA8PSA3KSB7XG4gICAgICAgIGlmIChjZWxsc1t4XVtqXS5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgIGlmICgoKF9iID0gY2VsbHNbeF1bal0uY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuY29sb3IpICE9PSBmcm9tQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1bal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVtqXSk7XG4gICAgICAgIH1cbiAgICAgICAgeCsrO1xuICAgIH1cbiAgICAvLyBnb2luZyBsZWZ0XG4gICAgeCA9IGkgLSAxO1xuICAgIHdoaWxlICh4ID49IDApIHtcbiAgICAgICAgaWYgKGNlbGxzW3hdW2pdLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2MgPSBjZWxsc1t4XVtqXS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVtqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW2pdKTtcbiAgICAgICAgfVxuICAgICAgICB4LS07XG4gICAgfVxuICAgIC8vIGdvaW5nIHRvcFxuICAgIGxldCB5ID0gaiAtIDE7XG4gICAgd2hpbGUgKHkgPj0gMCkge1xuICAgICAgICBpZiAoY2VsbHNbaV1beV0uY3VycmVudFBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoKChfZCA9IGNlbGxzW2ldW3ldLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNvbG9yKSAhPT0gZnJvbUNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2ldW3ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaV1beV0pO1xuICAgICAgICB9XG4gICAgICAgIHktLTtcbiAgICB9XG4gICAgeSA9IGogKyAxO1xuICAgIHdoaWxlICh5IDw9IDcpIHtcbiAgICAgICAgaWYgKGNlbGxzW2ldW3ldLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2UgPSBjZWxsc1tpXVt5XS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpXVt5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2ldW3ldKTtcbiAgICAgICAgfVxuICAgICAgICB5Kys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuQ2VsbEhlbHBlci5HZXQ0NURlZ3JlZUNlbGxzSWZFbXB0eUZyb21JbmRleCA9IChmcm9tQ29sb3JUeXBlLCBjZWxscywgaSwgaikgPT4ge1xuICAgIHZhciBfYiwgX2MsIF9kLCBfZTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICAvLyBnb2luZyB0b3AtcmlnaHRcbiAgICBsZXQgeCA9IGkgLSAxO1xuICAgIGxldCB5ID0gaiArIDE7XG4gICAgd2hpbGUgKHggPj0gMCAmJiB5IDw9IDcpIHtcbiAgICAgICAgaWYgKGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkge1xuICAgICAgICAgICAgaWYgKCgoX2IgPSBjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5jb2xvcikgIT09IGZyb21Db2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgfVxuICAgICAgICB4LS07XG4gICAgICAgIHkrKztcbiAgICB9XG4gICAgLy8gZ29pbmcgYm90dG9tLWxlZnRcbiAgICB4ID0gaSArIDE7XG4gICAgeSA9IGogLSAxO1xuICAgIHdoaWxlICh4IDw9IDcgJiYgeSA+PSAwKSB7XG4gICAgICAgIGlmIChjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgIGlmICgoKF9jID0gY2VsbHNbeF1beV0uY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY29sb3IpICE9PSBmcm9tQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1beV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgIH1cbiAgICAgICAgeCsrO1xuICAgICAgICB5LS07XG4gICAgfVxuICAgIC8vIGdvaW5nIHRvcC1sZWZ0XG4gICAgeCA9IGkgLSAxO1xuICAgIHkgPSBqIC0gMTtcbiAgICB3aGlsZSAoeCA+PSAwICYmIHkgPj0gMCkge1xuICAgICAgICBpZiAoY2VsbHNbeF1beV0uY3VycmVudFBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoKChfZCA9IGNlbGxzW3hdW3ldLmN1cnJlbnRQaWVjZSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLmNvbG9yKSAhPT0gZnJvbUNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW3hdW3ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1beV0pO1xuICAgICAgICB9XG4gICAgICAgIHgtLTtcbiAgICAgICAgeS0tO1xuICAgIH1cbiAgICAvLyBnb2luZyBib3R0b20tcmlnaHRcbiAgICB4ID0gaSArIDE7XG4gICAgeSA9IGogKyAxO1xuICAgIHdoaWxlICh4IDw9IDcgJiYgeSA8PSA3KSB7XG4gICAgICAgIGlmIChjZWxsc1t4XVt5XS5jdXJyZW50UGllY2UpIHtcbiAgICAgICAgICAgIGlmICgoKF9lID0gY2VsbHNbeF1beV0uY3VycmVudFBpZWNlKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuY29sb3IpICE9PSBmcm9tQ29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbeF1beV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjZWxsc1t4XVt5XSk7XG4gICAgICAgIH1cbiAgICAgICAgeCsrO1xuICAgICAgICB5Kys7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuQ2VsbEhlbHBlci5HZXRMTW92ZW1lbnRDZWxsc0Zyb21JbmRleCA9IChjZWxscywgaSwgaikgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIC8vIDggcG9zc2libGUgbW92ZXMgYSBrbmlnaHQgY2FuIG1ha2UgaWYgdmFsaWRcbiAgICAvLyB0b3AtcmlnaHRcbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSAtIDIsIGogKyAxKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpIC0gMl1baiArIDFdKTtcbiAgICB9XG4gICAgaWYgKF9hLklzQ2VsbFZhbGlkKGkgLSAxLCBqICsgMikpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSAtIDFdW2ogKyAyXSk7XG4gICAgfVxuICAgIC8vIGJvdHRvbS1yaWdodFxuICAgIGlmIChfYS5Jc0NlbGxWYWxpZChpICsgMSwgaiArIDIpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgKyAxXVtqICsgMl0pO1xuICAgIH1cbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSArIDIsIGogKyAxKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMl1baiArIDFdKTtcbiAgICB9XG4gICAgLy8gYm90dG9tLWxlZnRcbiAgICBpZiAoX2EuSXNDZWxsVmFsaWQoaSArIDEsIGogLSAyKSkge1xuICAgICAgICByZXN1bHQucHVzaChjZWxsc1tpICsgMV1baiAtIDJdKTtcbiAgICB9XG4gICAgaWYgKF9hLklzQ2VsbFZhbGlkKGkgKyAyLCBqIC0gMSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSArIDJdW2ogLSAxXSk7XG4gICAgfVxuICAgIC8vIHRvcC1sZWZ0XG4gICAgaWYgKF9hLklzQ2VsbFZhbGlkKGkgLSAxLCBqIC0gMikpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY2VsbHNbaSAtIDFdW2ogLSAyXSk7XG4gICAgfVxuICAgIGlmIChfYS5Jc0NlbGxWYWxpZChpIC0gMiwgaiAtIDEpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGNlbGxzW2kgLSAyXVtqIC0gMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HbG9iYWxzID0gdm9pZCAwO1xuY2xhc3MgR2xvYmFscyB7XG59XG5leHBvcnRzLkdsb2JhbHMgPSBHbG9iYWxzO1xuR2xvYmFscy5CT0FSRF9UT19XSU5ET1dfUkFUSU8gPSAwLjg7XG5HbG9iYWxzLkJMQUNLX0NFTExfQ09MT1IgPSBcIiNiYTg4NjZcIjtcbkdsb2JhbHMuV0hJVEVfQ0VMTF9DT0xPUiA9IFwiI2Y1ZDliOVwiO1xuR2xvYmFscy5MQVNUX01PVkVEX0NPTE9SID0gXCIjY2ZkMDgzXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUm5kID0gdm9pZCAwO1xuY2xhc3MgUm5kIHtcbiAgICBzdGF0aWMgR2VuZXJhdGVJZCgpIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KSArIFwiMDAwMDAwMDAwMDAwMDAwMDBcIikuc2xpY2UoMiwgNSArIDIpO1xuICAgIH1cbn1cbmV4cG9ydHMuUm5kID0gUm5kO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlVuaWNvZGVDaGFyYWN0ZXJzID0gdm9pZCAwO1xuZXhwb3J0cy5Vbmljb2RlQ2hhcmFjdGVycyA9IHtcbiAgICBXaGl0ZToge1xuICAgICAgICBLaW5nOiBcIuKZlFwiLFxuICAgICAgICBRdWVlbjogXCLimZVcIixcbiAgICAgICAgUm9vazogXCLimZZcIixcbiAgICAgICAgQmlzaG9wOiBcIuKZl1wiLFxuICAgICAgICBLbmlnaHQ6IFwi4pmYXCIsXG4gICAgICAgIFBhd246IFwi4pmZXCIsXG4gICAgfSxcbiAgICBCbGFjazoge1xuICAgICAgICBLaW5nOiBcIuKZmlwiLFxuICAgICAgICBRdWVlbjogXCLimZtcIixcbiAgICAgICAgUm9vazogXCLimZxcIixcbiAgICAgICAgQmlzaG9wOiBcIuKZnVwiLFxuICAgICAgICBLbmlnaHQ6IFwi4pmeXCIsXG4gICAgICAgIFBhd246IFwi4pmfXCIsXG4gICAgfSxcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==