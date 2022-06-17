import { BaseComponent } from "../BaseComponent";
import { Board } from "../Board";
import { Canvas } from "../Canvas";
import { Cell } from "../Cell";
import { ColorType, PieceType } from "../types";
import { CellHelper } from "../utils/CellHelper";

export abstract class BasePiece extends BaseComponent {
  public img: HTMLImageElement = document.querySelector("#pieces")!;

  private coordinates = {
    pawn: { x: 0, y: 0 },
  };

  constructor(
    private readonly board: Board,
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

  // public draw = () => {
  //   const imgSize = this.img.naturalWidth / 6;
  //   const size = imgSize;
  //   const { x, y } = CellHelper.GetCellCenterByName(
  //     this.board.cells,
  //     this.currentPosition
  //   );
  //   this.canvas.ctx.drawImage(
  //     this.img,
  //     imgSize,
  //     imgSize,
  //     size,
  //     size,
  //     x - size / 12,
  //     y - size / 12,
  //     50,
  //     50
  //   );
  // };

  public draw = () => {
    const imgSize = this.img.naturalWidth / 6;
    const size = imgSize;
    const { x, y } = CellHelper.GetCellCenterByName(
      this.board.cells,
      this.currentPosition
    );

    this.canvas.ctx.drawImage(
      this.img,
      imgSize,
      imgSize,
      size,
      size,
      x - size / 12,
      y - size / 12,
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
