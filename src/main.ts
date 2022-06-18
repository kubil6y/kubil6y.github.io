import { game } from "./setup";

game.init();

// const cell = game.board.getCellAtPosition("b3");
// cell.color = "red";
// console.log(cell);

game.draw();

function main() {
  game.canvas.ctx.clearRect(0, 0, game.canvas.c.width, game.canvas.c.height);

  game.draw();
  requestAnimationFrame(main);
}

main();
