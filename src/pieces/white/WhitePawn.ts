import { Cell } from "../../Cell";
import { CellHelper } from "../../utils/CellHelper";
import { UnicodeCharacters } from "../../utils/UnicodeCharacters";
import { Pawn } from "../Pawn";

export class WhitePawn extends Pawn {
  public unicode: string = UnicodeCharacters.White.Pawn;

  public isValidMove = (cells: Cell[][], nextCell: Cell): boolean => {
    console.log(this.currentPosition); // TODO currposition log
    const { i: currI, j: currJ } = CellHelper.NameToIndex(this.currentPosition);
    const currentCell = CellHelper.GetCellCenterByIndexes(cells, currI, currJ);

    const { i: nextI, j: nextJ } = CellHelper.NameToIndex(nextCell.name);
    return true;
  };

  public getValidMoves = (cells: Cell[][]): Cell[] => {
    return [];
  };

  public getImageCoordinates(): {
    imgW: number;
    imgH: number;
    imgOffsetX: number;
    imgOffsetY: number;
  } {
    return {
      imgW: 5,
      imgH: 0,
      imgOffsetX: 9,
      imgOffsetY: 13,
    };
  }
}
