import { ChessPieceColor } from '../interfaces/piece-color.model';
import { ChessPiece } from '../piece.model';
import { PiecePosition, PositionRowPiece } from '../interfaces/position.model';
import { PieceInterface } from '../interfaces/piece.interface';
import { ChessBoard } from '../board.model';

export class KnightPiece extends ChessPiece implements PieceInterface {
  constructor(position: PiecePosition, color: ChessPieceColor) {
    super(position, color);
    this._type = 'knight';
    this.setImage();
  }

  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[][] {
    let movements: Array<PiecePosition[]> = [];

    for (let i = 0; i < 2; i++) {
      const availablePositionUpward = this.getAvailablePosition(
        currentBoard,
        1,
        8
      )[i];
      const availablePositionDownward = this.getAvailablePosition(
        currentBoard,
        -1,
        1
      )[i];

      movements.push(availablePositionUpward.concat(availablePositionDownward));
    }

    return movements;
  }

  /**
   * Return the available position for the queen for a direction (up/down) on the board
   * @param currentBoard All the current piece on the board
   * @param direction The direction (up=1/down=-1) to check
   * @param maximum The maximum row based on the direction
   */
  private getAvailablePosition(
    currentBoard: ChessBoard,
    direction: -1 | 1,
    maximum: 1 | 8
  ): Array<PiecePosition[]> {
    let availableMovement: PiecePosition[] = [];
    let potentialAttack: PiecePosition[] = [];
    let movements: Array<PiecePosition[]> = [];

    let currentColumnMiddle = PiecePosition.transformColumnToNumber(
      this.position.column
    );
    let rowColumnMovements: { row: number; column: number }[] = [
      {
        row: this.position.row + direction * 2,
        column: currentColumnMiddle + direction,
      },
      {
        row: this.position.row - direction * 2,
        column: currentColumnMiddle + direction,
      },
      {
        row: this.position.row + direction,
        column: currentColumnMiddle + direction * 2,
      },
      {
        row: this.position.row - direction,
        column: currentColumnMiddle + direction * 2,
      },
    ];

    for (let i = 0; i < rowColumnMovements.length; i++) {
      this.getAvailableCase(
        currentBoard,
        availableMovement,
        potentialAttack,
        rowColumnMovements[i]['row'],
        rowColumnMovements[i]['column']
      );
    }

    movements.push(availableMovement);
    movements.push(potentialAttack);

    return movements;
  }

  protected getAvailableCase(
    currentBoard: ChessBoard,
    availableMovement: PiecePosition[],
    potentialAttack: PiecePosition[],
    rowDirection: number,
    columnDirection: number
  ) {
    let currentColumnMiddle = PiecePosition.transformColumnToNumber(
      this.position.column
    );
    let positionToCheck = this.getPositionToCheck(
      rowDirection,
      columnDirection
    );
    this.getMovements(positionToCheck, currentBoard, availableMovement, potentialAttack);
    currentColumnMiddle = currentBoard.hasPieceInPosition(positionToCheck)
      ? -1
      : currentColumnMiddle;
  }
}
