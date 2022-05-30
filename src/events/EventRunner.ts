import { Canvas } from "../Canvas";
import { ResizeEvents } from "./ResizeEvents";

export class EventRunner {
  public static run(canvas: Canvas) {
    new ResizeEvents(canvas);
  }
}
