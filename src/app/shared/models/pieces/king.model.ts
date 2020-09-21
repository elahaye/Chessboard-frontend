import { ChessPieceColor } from '../interfaces/piece-color.model';
import { ChessPiece } from '../piece.model';
import { PiecePosition } from '../interfaces/position.model';
import { PieceInterface } from '../interfaces/piece.interface';
import { ChessBoard } from '../board.model';

export class KingPiece extends ChessPiece implements PieceInterface {
  constructor(position: PiecePosition, color: ChessPieceColor) {
    super(position, color);
    this._type = 'king';
    if (this._color === 'white') {
      this._img = 'white_king';
    } else if (this._color === 'black') {
      this._img = 'black_king';
    }
  }

  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[] {
    return [];
  }
}
