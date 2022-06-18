import { Canvas } from "../Canvas";
import { ResizeEvents } from "./ResizeEvents";

export class EventRunner {
  private _resizeEvents = new ResizeEvents(this._canvas);

  constructor(private _canvas: Canvas) {}
}
