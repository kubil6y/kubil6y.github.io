import { Game } from "./Game";

export class InformationService {
  public root = document.querySelector(":root")! as HTMLElement;

  constructor(public game: Game) {}

  public update = () => {
    this.root.style.setProperty(
      "--current-player",
      this.game.board.currentPlayer
    );
  };
}
