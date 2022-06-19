import { Game } from "./Game";

export class InformationService {
  public currentPlayerText = document.querySelector("#current_player")!;

  constructor(public game: Game) {}

  public update = () => {
    this.currentPlayerText.innerHTML = `Current Player: ${this.game.board.currentPlayer.toUpperCase()}`;
  };
}
