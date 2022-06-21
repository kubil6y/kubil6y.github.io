import { BaseComponent } from "../BaseComponent";
import { Board } from "../Board";
import { Canvas } from "../Canvas";
import { Cell } from "../Cell";
import { ColorType } from "../types";
import { CellHelper } from "../utils/CellHelper";

export abstract class BasePiece extends BaseComponent {
  public img: HTMLImageElement = document.querySelector("#pieces")!;
  public hasMoved: boolean = false;

  constructor(
    public board: Board,
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

  public abstract unicode: string;
  public abstract pointsValue: number;

  public abstract isValidMove(cells: Cell[][], nextCell: Cell): boolean;

  public abstract getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  };

  public draw() {
    const { x, y } = CellHelper.GetCellCenterByName(
      this.board.cells,
      this.currentPosition
    );

    const sWidth = this.img.naturalWidth / 6;
    const sHeight = this.img.naturalHeight / 2;

    const { imgW, imgH, imgOffsetX, imgOffsetY } = this.getImageCoordinates();
    const sx = sWidth * imgW;
    const sy = sHeight * imgH;

    const offsetX = sWidth / imgOffsetX;
    const offsetY = sHeight / imgOffsetY;
    const dx = x - offsetX;
    const dy = y - offsetY;

    const dWidth = 50;
    const dHeight = 50;

    this.canvas.ctx.drawImage(
      this.img,
      sx,
      sy,
      sWidth,
      sHeight,
      dx,
      dy,
      dWidth,
      dHeight
    );
  }

  public drawUnicode = (): void => {
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.font = `${this.size}px arial`;
    this.canvas.ctx.fillText(this.unicode, this.x, this.y);
    this.canvas.ctx.strokeRect(this.x, this.y, this.size, this.size);
  };
}
