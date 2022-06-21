import { Cell } from "../../Cell";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class BlackPawn extends Pawn {
  public unicode: string = UnicodeCharacters.Black.Pawn;

  public isValidMove(cells: Cell[][], nextCell: Cell): boolean {
    console.log(this.currentPosition); // TODO currposition log
    return true;
  }

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 1,
      imgOffsetX: 9,
      imgOffsetY: 11,
    };
  }
}
