import { BaseComponent } from "../BaseComponent";
import { Canvas } from "../Canvas";
import { ColorType, PieceType } from "../types";

export abstract class BasePiece extends BaseComponent {
  public img: HTMLImageElement = document.querySelector("#pieces")!;

  private coordinates = {
    pawn: { x: 0, y: 0 },
  };
  constructor(
    public initialPosition: string,
    public currentPosition: string,
    public name: string,
    public canvas: Canvas,
    public x: number,
    public y: number,
    public size: number,
    public color: ColorType
  ) {
    super(name, canvas, x, y, size, color);
  }

  public draw = () => {
    const imgSize = this.img.naturalWidth / 6;
    const size = imgSize;
    this.canvas.ctx.drawImage(
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

  public getCoordinates = (t: PieceType, color: ColorType) => {
    switch (t) {
      case "PAWN":
        return { x: 3, y: 0 };
      default:
        throw new Error("invalid type");
    }
  };
}
