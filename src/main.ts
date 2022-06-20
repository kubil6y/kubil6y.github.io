import { game } from "./setup";

game.init();

function main() {
  game.canvas.ctx.clearRect(0, 0, game.canvas.c.width, game.canvas.c.height);
  game.draw();
  requestAnimationFrame(main);
}
main();

const root = document.querySelector(":root")! as HTMLElement;
root.style.setProperty("--current-player", "blue");
