import { Board } from "../Board";
import { ClickEvents } from "./ClickEvents";
import { ResizeEvents } from "./ResizeEvents";

export class EventRunner {
  private _resizeEvents = new ResizeEvents(this.board);
  private _clickEvents = new ClickEvents(this.board);

  constructor(public board: Board) {}
}
