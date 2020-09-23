import { ChessPieceColor } from './interfaces/piece-color.model';
import { ChessPieceType } from './interfaces/piece-type.model';
import { PiecePosition } from './interfaces/position.model';
import { PieceInterface } from './interfaces/piece.interface';
import { ChessBoard } from './board.model';

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

  getAvailableMovement(currentBoard: ChessBoard): PiecePosition[] {
    return [];
  }
}
