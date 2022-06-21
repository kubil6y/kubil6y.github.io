import { game } from "./setup";
// import { CellHelper } from "./utils/CellHelper";

game.init();
game.draw();

function main() {
  game.canvas.ctx.clearRect(0, 0, game.canvas.c.width, game.canvas.c.height);
  game.draw();
  requestAnimationFrame(main);
}
main();
