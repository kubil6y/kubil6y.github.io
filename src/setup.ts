import { Board } from "./Board";
import { Canvas } from "./Canvas";
import { EventRunner } from "./events/EventRunner";

export const canvas = new Canvas();
export const board = new Board(canvas);
EventRunner.run(canvas);
