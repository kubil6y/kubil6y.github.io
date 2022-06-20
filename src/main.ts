import { game } from "./setup";

game.init();

function main() {
  game.canvas.ctx.clearRect(0, 0, game.canvas.c.width, game.canvas.c.height);
  game.draw();
  requestAnimationFrame(main);
}
main();

// setInterval(() => {
//   console.log(game.board.capturedPieces);
// }, 2500);
