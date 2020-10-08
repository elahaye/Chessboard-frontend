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
    const availableMovement: PiecePosition[] = [];
    const potentialAttack: PiecePosition[] = [];
    let movements: Array<PiecePosition[]> = [];

    let currentColumnLeft =
      PiecePosition.transformColumnToNumber(this.position.column) - 1;
    let currentColumnMiddle = PiecePosition.transformColumnToNumber(
      this.position.column
    );
    let currentColumnRight =
      PiecePosition.transformColumnToNumber(this.position.column) + 1;

    if (
      1 <= this.position.row + direction &&
      this.position.row + direction <= 8
    ) {
      // Diagonal movements
      if (this.checkIfAccessible(currentColumnLeft)) {
        const positionLeftToCheck = this.getPositionToCheck(
          this.position.row + direction,
          currentColumnLeft
        );
        this.getMovements(positionLeftToCheck, currentBoard, availableMovement, potentialAttack);

        currentColumnLeft = currentBoard.hasPieceInPosition(positionLeftToCheck)
          ? -1
          : currentColumnLeft - 1;
      }
      if (this.checkIfAccessible(currentColumnRight)) {
        const positionRightToCheck = this.getPositionToCheck(
          this.position.row + direction,
          currentColumnRight
        );
        this.getMovements(positionRightToCheck, currentBoard, availableMovement, potentialAttack);

        currentColumnRight = currentBoard.hasPieceInPosition(
          positionRightToCheck
        )
          ? -1
          : currentColumnRight + 1;
      }
      // Vertical movements
      if (this.checkIfAccessible(currentColumnMiddle)) {
        const positionMiddleToCheck = this.getPositionToCheck(
          this.position.row + direction,
          currentColumnMiddle
        );
        this.getMovements(positionMiddleToCheck, currentBoard, availableMovement, potentialAttack);
        currentColumnMiddle = currentBoard.hasPieceInPosition(
          positionMiddleToCheck
        )
          ? -1
          : currentColumnMiddle;
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
      this.getMovements(positionToCheck, currentBoard, availableMovement, potentialAttack);
      currentColumnMiddle = currentBoard.hasPieceInPosition(positionToCheck)
        ? -1
        : currentColumnMiddle;
    }

    movements.push(availableMovement);
    movements.push(potentialAttack);

    return movements;
  }
}
