import { AllChessPieces, ChessPiece } from './piece.model';
import { PiecePosition } from './interfaces/position.model';

export class ChessBoard {
  pieces: AllChessPieces[];

  constructor(pieces: AllChessPieces[]) {
    this.pieces = pieces;
  }

  /**
   * Check a position in the board to see if there is already a piece on it
   * @param position The position to check on the current board
   */
  public hasPieceInPosition(position: PiecePosition): boolean {
    return (
      this.pieces.filter(
        (piece: ChessPiece) =>
          piece.position.row === position.row &&
          piece.position.column === position.column
      ).length === 1
    );
  }

  /**
   * Return a piece for a given position. Returns undefined if there is no piece in this position
   * @param position
   */
  public getPieceInPosition(position: PiecePosition): ChessPiece | undefined {
    return this.pieces.find(
      (piece: ChessPiece) =>
        piece.position.row === position.row &&
        piece.position.column === position.column
    );
  }
}
