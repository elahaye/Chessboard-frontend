import { ChessPieceColor } from '../interfaces/piece-color.model';
import { ChessPiece } from '../piece.model';
import { PiecePosition, PositionRowPiece } from '../interfaces/position.model';
import { PieceInterface } from '../interfaces/piece.interface';
import { ChessBoard } from '../board.model';

export class KingPiece extends ChessPiece implements PieceInterface {
  constructor(position: PiecePosition, color: ChessPieceColor) {
    super(position, color);
    this._type = 'king';
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
    const availableMovement: PiecePosition[] = [];

    // Vertical and Diagonal movements
    let currentColumnLeft =
      PiecePosition.transformColumnToNumber(this.position.column) - 1;
    let currentColumnMiddle = PiecePosition.transformColumnToNumber(
      this.position.column
    );
    let currentColumnRight =
      PiecePosition.transformColumnToNumber(this.position.column) + 1;

    if (this.checkIfAccessible(currentColumnLeft)) {
      const positionLeftToCheck = this.getPositionToCheck(
        this.position.row + direction,
        currentColumnLeft
      );
      if (!currentBoard.hasPieceInPosition(positionLeftToCheck)) {
        availableMovement.push(positionLeftToCheck);
      }
      currentColumnLeft = currentBoard.hasPieceInPosition(positionLeftToCheck)
        ? -1
        : currentColumnLeft - 1;
    }
    if (this.checkIfAccessible(currentColumnMiddle)) {
      const positionMiddleToCheck = this.getPositionToCheck(
        this.position.row + direction,
        currentColumnMiddle
      );
      if (!currentBoard.hasPieceInPosition(positionMiddleToCheck)) {
        availableMovement.push(positionMiddleToCheck);
      }
      currentColumnMiddle = currentBoard.hasPieceInPosition(
        positionMiddleToCheck
      )
        ? -1
        : currentColumnMiddle;
    }
    if (this.checkIfAccessible(currentColumnRight)) {
      const positionRightToCheck = this.getPositionToCheck(
        this.position.row + direction,
        currentColumnRight
      );
      currentColumnRight = currentBoard.hasPieceInPosition(positionRightToCheck)
        ? -1
        : currentColumnRight + 1;
      if (!currentBoard.hasPieceInPosition(positionRightToCheck)) {
        availableMovement.push(positionRightToCheck);
      }
    }

    // Horizontal movements
    currentColumnMiddle =
      PiecePosition.transformColumnToNumber(this.position.column) + direction;
    if (this.checkIfAccessible(currentColumnMiddle)) {
      const positionToCheck = this.getPositionToCheck(
        this.position.row,
        currentColumnMiddle
      );
      if (!currentBoard.hasPieceInPosition(positionToCheck)) {
        availableMovement.push(positionToCheck);
      }
      currentColumnMiddle = currentBoard.hasPieceInPosition(positionToCheck)
        ? -1
        : currentColumnMiddle + direction;
    }

    return availableMovement;
  }

  /**
   * If we check the board going downward, the iteration value is going down and not up to a
   * maximum, so we need to dynamise the check for maximum value in the for.
   * @param i Current iteration value
   * @param maximum Maximum value for the iteration
   */
  private checkMaximumFor(i: number, maximum: 1 | 8) {
    return maximum === 1 ? i >= maximum : i <= maximum;
  }

  /**
   * Check if a position should be checked
   * @param currentColumn The current column to check (-1 = should not checked)
   */
  private checkIfAccessible(currentColumn: number) {
    return (
      currentColumn !== -1 &&
      PiecePosition.transformNumberToColumn(currentColumn) !== undefined
    );
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
