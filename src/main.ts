import { Game } from "./Game";
import { WhiteKing } from "./pieces/white/WhiteKing";
import { canvas } from "./setup";

const game = new Game(canvas);

game.init();

const cell = game._board.getCellAtPosition("b5");
// cell.color = "brown";
console.log(cell);

game.draw();
