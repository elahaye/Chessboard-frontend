import { ChessPieceColor } from '../interfaces/piece-color.model';
import { ChessPiece } from '../piece.model';
import { PiecePosition } from '../interfaces/position.model';
import { ChessBoard } from '../board.model';
import { PieceInterface } from '../interfaces/piece.interface';

export class BishopPiece extends ChessPiece implements PieceInterface {
  constructor(position: PiecePosition, color: ChessPieceColor) {
    super(position, color);
    this._type = 'bishop';
    if (this._color === 'white') {
      this._img = 'white_bishop';
    } else if (this._color === 'black') {
      this._img = 'black_bishop';
    }
  }

  public getAvailableMovement(currentBoard: ChessBoard): PiecePosition[] {
    return [];
  }
}
