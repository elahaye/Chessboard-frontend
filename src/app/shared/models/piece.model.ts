import { ChessPieceColor } from './interfaces/piece-color.model';
import { ChessPieceType } from './interfaces/piece-type.model';
import { PiecePosition, PositionRowPiece } from './interfaces/position.model';
import { PieceInterface } from './interfaces/piece.interface';
import { ChessBoard } from './board.model';
import { BishopPiece } from './pieces/bishop.model';
import { QueenPiece } from './pieces/queen.model';
import { KingPiece } from './pieces/king.model';
import { PoundPiece } from './pieces/pound.model';
import { RookPiece } from './pieces/rook.model';
import { KnightPiece } from './pieces/knight.model';

export class ChessPiece implements PieceInterface {
  protected _type: ChessPieceType;
  protected _position: PiecePosition;
  protected _color: ChessPieceColor;
  protected _img: string;

  constructor(position: PiecePosition, color: ChessPieceColor) {
    this._position = position;
    this._color = color;
  }

  public get position() {
    return this._position;
  }

  public set position(newPosition) {
    this._position = newPosition;
  }

  public get color() {
    return this._color;
  }

  public get type() {
    return this._type;
  }

  public get img() {
    return this._img;
  }

  protected setImage() {
    this._img = `${this._color}_${this._type}`;
  }

  /**
   * Return an array with available movements of the selected piece(array1) and its potential attacks (array2)
   * @param currentBoard
   */
  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[][] {
    return [];
  }

  /**
   * If we check the board going downward, the iteration value is going down and not up to a
   * maximum, so we need to dynamise the check for maximum value in the for.
   * @param i Current iteration value
   * @param maximum Maximum value for the iteration
   */
  protected checkMaximumFor(i: number, maximum: 1 | 8) {
    return maximum === 1 ? i >= maximum : i <= maximum;
  }

  /**
   * Check if a position should be checked
   * @param currentColumn The current column to check (-1 = should not checked)
   */
  protected checkIfAccessible(currentColumn: number) {
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
  protected getPositionToCheck(i: number, currentColumn: number): PiecePosition {
    return {
      row: i as PositionRowPiece,
      column: PiecePosition.transformNumberToColumn(currentColumn),
    };
  }

  protected getDiagonalMovements(direction: -1 | 1, maximum: 1 | 8, currentBoard: ChessBoard, availableMovement: PiecePosition[], potentialAttack: PiecePosition[]) {
    let currentColumnLeft =
      PiecePosition.transformColumnToNumber(this.position.column) - 1;
    let currentColumnRight =
      PiecePosition.transformColumnToNumber(this.position.column) + 1;

    for (
      let i = this.position.row + direction;
      this.checkMaximumFor(i, maximum);
      i += direction
    ) {
      if (this.checkIfAccessible(currentColumnLeft)) {
        const positionLeftToCheck = this.getPositionToCheck(
          i,
          currentColumnLeft
        );
        this.getMovements(positionLeftToCheck, currentBoard, availableMovement, potentialAttack);

        currentColumnLeft = currentBoard.hasPieceInPosition(positionLeftToCheck)
          ? -1
          : currentColumnLeft - 1;
      }
      if (this.checkIfAccessible(currentColumnRight)) {
        const positionRightToCheck = this.getPositionToCheck(
          i,
          currentColumnRight
        );

        this.getMovements(positionRightToCheck, currentBoard, availableMovement, potentialAttack);

        currentColumnRight = currentBoard.hasPieceInPosition(
          positionRightToCheck
        )
          ? -1
          : currentColumnRight + 1;
      }
    }

    return [availableMovement, potentialAttack];
  }

  protected getVerticalMovements(direction: -1 | 1, maximum: 1 | 8, currentBoard: ChessBoard, availableMovement: PiecePosition[], potentialAttack: PiecePosition[]) {
    let currentColumnMiddle = PiecePosition.transformColumnToNumber(
      this.position.column
    );

    for (
      let i = this.position.row + direction;
      this.checkMaximumFor(i, maximum);
      i += direction
    ) {
      if (this.checkIfAccessible(currentColumnMiddle)) {
        const positionMiddleToCheck = this.getPositionToCheck(
          i,
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
    return [availableMovement, potentialAttack];
  }

  protected getHorizontalMovements(direction: -1 | 1, maximum: 1 | 8, currentBoard: ChessBoard, availableMovement: PiecePosition[], potentialAttack: PiecePosition[]) {
    let currentColumnMiddle =
      PiecePosition.transformColumnToNumber(this.position.column) + direction;
    for (
      let j = currentColumnMiddle;
      this.checkMaximumFor(j, maximum);
      j += direction
    ) {
      if (this.checkIfAccessible(currentColumnMiddle)) {
        const positionToCheck = this.getPositionToCheck(this.position.row, j);
        this.getMovements(positionToCheck, currentBoard, availableMovement, potentialAttack);
        currentColumnMiddle = currentBoard.hasPieceInPosition(positionToCheck)
          ? -1
          : j + direction;
      }
    }
    return [availableMovement, potentialAttack];
  }

  protected getMovements(positionToCheck: PiecePosition, currentBoard: ChessBoard, availableMovement: PiecePosition[], potentialAttack: PiecePosition[]) {
    const otherPiece = currentBoard.getPieceInPosition(positionToCheck);

    if (!currentBoard.hasPieceInPosition(positionToCheck)) {
      availableMovement.push(positionToCheck);
    }
    else if (otherPiece !== undefined && otherPiece.color !== this.color) {
      potentialAttack.push(positionToCheck);
    }
    return [availableMovement, potentialAttack];
  }
}

export type AllChessPieces =
  | BishopPiece
  | QueenPiece
  | KingPiece
  | PoundPiece
  | RookPiece
  | KnightPiece;
