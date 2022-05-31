import { Canvas } from "./Canvas";

export class ImageReader {
  public img: HTMLImageElement;
  constructor() {
    this.img = document.querySelector("#pieces")!;
  }

  public draw = (canvas: Canvas) => {
    const size = 302.5;
    const imgSize = 302.5;
    canvas.ctx.drawImage(
      this.img,
      imgSize,
      imgSize,
      size,
      size,
      60,
      60,
      50,
      50
    );
  };
}
