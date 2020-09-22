import { ChessPieceColor } from '../interfaces/piece-color.model';
import { ChessPiece } from '../piece.model';
import { PiecePosition } from '../interfaces/position.model';
import { ChessBoard } from '../board.model';
import { PieceInterface } from '../interfaces/piece.interface';

export class BishopPiece extends ChessPiece implements PieceInterface {
  constructor(position: PiecePosition, color: ChessPieceColor) {
    super(position, color);
    this._type = 'bishop';
    this.setImage();
  }

  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[] {
    return [];
  }
}
