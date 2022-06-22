import { game } from "./setup";
import { CellHelper } from "./utils/CellHelper";
// import { CellHelper } from "./utils/CellHelper";

game.init();
game.draw();

function main() {
  game.canvas.ctx.clearRect(0, 0, game.canvas.c.width, game.canvas.c.height);
  game.draw();
  requestAnimationFrame(main);
}
main();

export const devButton = document.querySelector("#dev-button")!;
devButton.addEventListener("click", () => {
  game.printPiecesOnBoard();

  const target = CellHelper.IndexToName(4, 4);
  console.log({
    target,
    possibleMoves: game.board.possibleMoves,
    board: game.board,
  });
});
