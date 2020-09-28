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

  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[] {
    const availablePositionUpward = this.getAvailablePosition(
      currentBoard,
      1,
      8
    );
    const availablePositionDownward = this.getAvailablePosition(
      currentBoard,
      -1,
      1
    );

    return availablePositionUpward.concat(availablePositionDownward);
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
  ): PiecePosition[] {
    let availableMovement: PiecePosition[] = [];
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
        rowColumnMovements[i]['row'],
        rowColumnMovements[i]['column']
      );
    }

    return availableMovement;
  }

  protected getAvailableCase(
    currentBoard: ChessBoard,
    availableMovement: PiecePosition[],
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

    if (!currentBoard.hasPieceInPosition(positionToCheck)) {
      availableMovement.push(positionToCheck);
    }
    currentColumnMiddle = currentBoard.hasPieceInPosition(positionToCheck)
      ? -1
      : currentColumnMiddle;
  }

  /**
   * Build a position based on the iteration for the row and the current column for the column
   * @param i The current iteration of the for
   * @param currentColumn The current column that we are checking
   * @return The formatted piece position
   */
  private getPositionToCheck(i: number, currentColumn: number): PiecePosition {
    return {
      row: i as PositionRowPiece,
      column: PiecePosition.transformNumberToColumn(currentColumn),
    };
  }
}
